import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Activity, ArrowLeft, Loader2 } from 'lucide-react';

import { PageHeader } from '../components';
import { apiClient } from '../api/client';
import PatientMLRiskPredictor from '../components/dashboard/PatientMLRiskPredictor';

type RiskLevel = 'Green' | 'Yellow' | 'Red' | string;

interface Patient {
  id: number;
  name: string;
  age: number;
  pregnancy_week: number;
  village: string;
}

interface Survey {
  id: number;
  patient_id: number;
  baseline_value: number;
  accelerations: number;
  fetal_movement: number;
  uterine_contractions: number;
  light_decelerations: number;
  severe_decelerations: number;
  prolongued_decelerations: number;
  abnormal_short_term_variability: number;
  mean_value_of_short_term_variability: number;
  percentage_of_time_with_abnormal_long_term_variability: number;
  mean_value_of_long_term_variability: number;
  histogram_width: number;
  histogram_min: number;
  histogram_max: number;
  histogram_number_of_peaks: number;
  histogram_number_of_zeroes: number;
  histogram_mode: number;
  histogram_mean: number;
  histogram_median: number;
  histogram_variance: number;
  histogram_tendency: number;
  risk_level: RiskLevel;
  created_at: string;
}

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = Number(id);

  const {
    data: patient,
    isLoading: isPatientLoading,
    isError: isPatientError,
  } = useQuery<Patient>({
    queryKey: ['patient', patientId],
    enabled: Number.isFinite(patientId),
    queryFn: async () => {
      const res = await apiClient.get<Patient>(`/patients/${patientId}`);
      return res.data;
    },
  });

  const {
    data: surveys,
    isLoading: isSurveysLoading,
    isError: isSurveysError,
  } = useQuery<Survey[]>({
    queryKey: ['patient-surveys', patientId],
    enabled: Number.isFinite(patientId),
    queryFn: async () => {
      const res = await apiClient.get<Survey[]>(`/survey/patient/${patientId}`);
      return res.data;
    },
  });

  const latestSurvey = useMemo(() => {
    if (!surveys || surveys.length === 0) return null;
    return [...surveys].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )[0];
  }, [surveys]);

  const riskColor =
    latestSurvey?.risk_level === 'High'
      ? 'bg-red-100 text-red-700'
      : latestSurvey?.risk_level === 'Medium'
        ? 'bg-yellow-100 text-yellow-700'
        : latestSurvey?.risk_level === 'Low'
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-500';

  const isLoading = isPatientLoading || isSurveysLoading;
  const isError = isPatientError || isSurveysError;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader
        title="Patient file"
        subtitle="Detailed historical survey records and risk tracking."
        icon={<Activity className="w-4 h-4" />}
        actions={
          <Link
            to="/doctor-dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium rounded-xl text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
        }
      />

      {isLoading && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex items-center justify-center gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading patient details...</span>
        </div>
      )}

      {isError && !isLoading && (
        <div className="bg-red-50 rounded-2xl border border-red-100 p-6 text-sm text-red-700">
          Failed to load patient details. Please go back and try again.
        </div>
      )}

      {!isLoading && !isError && patient && (
        <>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {patient.age} years • Week {patient.pregnancy_week}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${riskColor}`}>
                  {latestSurvey?.risk_level ?? 'No risk data'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 text-xs uppercase">Village</p>
                  <p className="text-gray-900 font-semibold">{patient.village}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 text-xs uppercase">Last Check-in</p>
                  <p className="text-gray-900 font-semibold">
                    {latestSurvey
                      ? new Date(latestSurvey.created_at).toLocaleString()
                      : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <PatientMLRiskPredictor patientId={patientId} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                CTG Fetal Health Survey history
              </h3>
              {surveys && surveys.length > 0 ? (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                  {surveys
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime(),
                    )
                    .map((s) => (
                      <div
                        key={s.id}
                        className="border border-gray-100 rounded-xl p-3 text-xs space-y-1 bg-gray-50"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-800">
                            {new Date(s.created_at).toLocaleString()}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            s.risk_level === 'High' ? 'bg-red-100 text-red-700' :
                            s.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            s.risk_level === 'Low' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {s.risk_level}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <p className="text-gray-600">Base: <span className="font-semibold">{s.baseline_value}</span></p>
                            <p className="text-gray-600">Accels: <span className="font-semibold">{s.accelerations}</span></p>
                            <p className="text-gray-600">Moves: <span className="font-semibold">{s.fetal_movement}</span></p>
                            <p className="text-gray-600">UCs: <span className="font-semibold">{s.uterine_contractions}</span></p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No CTG surveys submitted yet for this patient.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientDetails;
