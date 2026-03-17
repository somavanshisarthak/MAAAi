import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, User, HeartPulse, ArrowRight, Loader2 } from 'lucide-react';
import { patientSurveySchema, type PatientSurveyFormValues } from '../utils/validations';
import { db } from '../db/db';
import { apiClient } from '../api/client';
import { ResultCard } from '../components/ResultCard';

const PatientSurvey: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultParams, setResultParams] = useState<{ riskLevel: string, offline: boolean } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PatientSurveyFormValues>({
    resolver: zodResolver(patientSurveySchema),
  });

  const onSubmit = async (data: PatientSurveyFormValues) => {
    setIsSubmitting(true);
    
    const payload = {
      patientData: {
        name: data.name,
        age: data.age,
        pregnancy_week: data.pregnancy_week,
        village: 'Mobile Client'
      },
      surveyData: {
        baseline_value: data.baseline_value,
        accelerations: data.accelerations,
        fetal_movement: data.fetal_movement,
        uterine_contractions: data.uterine_contractions,
        light_decelerations: data.light_decelerations,
        severe_decelerations: data.severe_decelerations,
        prolongued_decelerations: data.prolongued_decelerations,
        abnormal_short_term_variability: data.abnormal_short_term_variability,
        mean_value_of_short_term_variability: data.mean_value_of_short_term_variability,
        percentage_of_time_with_abnormal_long_term_variability: data.percentage_of_time_with_abnormal_long_term_variability,
        mean_value_of_long_term_variability: data.mean_value_of_long_term_variability,
        histogram_width: data.histogram_width,
        histogram_min: data.histogram_min,
        histogram_max: data.histogram_max,
        histogram_number_of_peaks: data.histogram_number_of_peaks,
        histogram_number_of_zeroes: data.histogram_number_of_zeroes,
        histogram_mode: data.histogram_mode,
        histogram_mean: data.histogram_mean,
        histogram_median: data.histogram_median,
        histogram_variance: data.histogram_variance,
        histogram_tendency: data.histogram_tendency,
      }
    };

    if (navigator.onLine) {
      try {
        const patientRes = await apiClient.post('/patients', payload.patientData);
        const surveyRes = await apiClient.post('/survey', {
          ...payload.surveyData,
          patient_id: patientRes.data.id
        });
        setResultParams({ riskLevel: surveyRes.data.risk_level, offline: false });
      } catch (err) {
        console.error("Online API failed, falling back to Dexie", err);
        await saveOffline(payload);
      }
    } else {
      await saveOffline(payload);
    }
    
    setIsSubmitting(false);
  };

  const saveOffline = async (payload: any) => {
    // No local rule analysis offline anymore
    let localRisk = "Unknown";

    await db.surveys.add({
      ...payload,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    setResultParams({ riskLevel: localRisk, offline: true });
  };

  if (resultParams) {
    return (
      <ResultCard
        riskLevel={resultParams.riskLevel}
        isOffline={resultParams.offline}
        onReset={() => {
          reset();
          setResultParams(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
        <div className="text-center space-y-2 pb-6 border-b border-gray-100">
          <div className="inline-flex items-center justify-center p-3 bg-teal-50 text-teal-700 rounded-full shadow-sm">
            <Activity className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Health Survey
          </h1>
          <p className="text-sm text-gray-500 px-4">
            Secure maternal check‑in that your doctor can review from the clinic.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 pt-6"
        >
          {/* Personal Details Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-teal-700 font-semibold">
              <User className="w-5 h-5" />
              <span>About you</span>
            </div>

            <div className="space-y-1">
              <input
                {...register('name')}
                placeholder="Full name"
                className="w-full text-base px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  placeholder="Age"
                  className="w-full text-base px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
                {errors.age && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.age.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="number"
                  {...register('pregnancy_week', { valueAsNumber: true })}
                  placeholder="Pregnancy week (1–42)"
                  className="w-full text-base px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
                {errors.pregnancy_week && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.pregnancy_week.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Clinical Parameters Section (CTG Features) */}
          <section className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2 text-teal-700 font-semibold mb-4">
              <HeartPulse className="w-5 h-5" />
              <span>CTG Fetal Health Parameters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'baseline_value', label: 'Baseline Value' },
                { name: 'accelerations', label: 'Accelerations' },
                { name: 'fetal_movement', label: 'Fetal Movement' },
                { name: 'uterine_contractions', label: 'Uterine Contractions' },
                { name: 'light_decelerations', label: 'Light Decelerations' },
                { name: 'severe_decelerations', label: 'Severe Decelerations' },
                { name: 'prolongued_decelerations', label: 'Prolongued Decelerations' },
                { name: 'abnormal_short_term_variability', label: 'Abnormal STV' },
                { name: 'mean_value_of_short_term_variability', label: 'Mean STV' },
                { name: 'percentage_of_time_with_abnormal_long_term_variability', label: '% Abnormal LTV' },
                { name: 'mean_value_of_long_term_variability', label: 'Mean LTV' },
                { name: 'histogram_width', label: 'Histogram Width' },
                { name: 'histogram_min', label: 'Histogram Min' },
                { name: 'histogram_max', label: 'Histogram Max' },
                { name: 'histogram_number_of_peaks', label: 'Hist. Peaks' },
                { name: 'histogram_number_of_zeroes', label: 'Hist. Zeroes' },
                { name: 'histogram_mode', label: 'Histogram Mode' },
                { name: 'histogram_mean', label: 'Histogram Mean' },
                { name: 'histogram_median', label: 'Histogram Median' },
                { name: 'histogram_variance', label: 'Histogram Variance' },
                { name: 'histogram_tendency', label: 'Histogram Tendency' },
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <span className="text-xs text-gray-500 font-medium">{field.label}</span>
                  <input
                    type="number"
                    step="any"
                    {...register(field.name as keyof PatientSurveyFormValues, { valueAsNumber: true })}
                    placeholder="0.0"
                    className="w-full text-sm px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  {errors[field.name as keyof PatientSurveyFormValues] && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors[field.name as keyof PatientSurveyFormValues]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-base font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying…
              </>
            ) : (
              <>
                Submit survey
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientSurvey;
