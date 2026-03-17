import React, { useState } from 'react';
import { Brain, Activity, AlertTriangle, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { apiClient } from '../../api/client';

interface FetalHealthData {
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
}

const MLRiskPredictor: React.FC = () => {
  const [formData, setFormData] = useState<FetalHealthData>({
    baseline_value: 120,
    accelerations: 0,
    fetal_movement: 0,
    uterine_contractions: 0,
    light_decelerations: 0,
    severe_decelerations: 0,
    prolongued_decelerations: 0,
    abnormal_short_term_variability: 0,
    mean_value_of_short_term_variability: 0,
    percentage_of_time_with_abnormal_long_term_variability: 0,
    mean_value_of_long_term_variability: 0,
    histogram_width: 0,
    histogram_min: 0,
    histogram_max: 0,
    histogram_number_of_peaks: 0,
    histogram_number_of_zeroes: 0,
    histogram_mode: 0,
    histogram_mean: 0,
    histogram_median: 0,
    histogram_variance: 0,
    histogram_tendency: 0,
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FetalHealthData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await apiClient.post('/survey/predict-risk', formData);
      const predictionData = response.data.prediction || response.data;
      setPrediction(predictionData.risk_level);
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'low': return <Activity className="w-5 h-5 text-green-600" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-900">ML Risk Predictor</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Basic Fetal Metrics */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Baseline Value</label>
          <input
            type="number"
            value={formData.baseline_value}
            onChange={(e) => handleInputChange('baseline_value', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Accelerations</label>
          <input
            type="number"
            step="0.001"
            value={formData.accelerations}
            onChange={(e) => handleInputChange('accelerations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Fetal Movement</label>
          <input
            type="number"
            step="0.001"
            value={formData.fetal_movement}
            onChange={(e) => handleInputChange('fetal_movement', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Uterine Contractions</label>
          <input
            type="number"
            step="0.001"
            value={formData.uterine_contractions}
            onChange={(e) => handleInputChange('uterine_contractions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Decelerations */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Light Decelerations</label>
          <input
            type="number"
            step="0.001"
            value={formData.light_decelerations}
            onChange={(e) => handleInputChange('light_decelerations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Severe Decelerations</label>
          <input
            type="number"
            step="0.001"
            value={formData.severe_decelerations}
            onChange={(e) => handleInputChange('severe_decelerations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Variability Metrics */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Abnormal Short Term Variability</label>
          <input
            type="number"
            step="0.001"
            value={formData.abnormal_short_term_variability}
            onChange={(e) => handleInputChange('abnormal_short_term_variability', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Mean Short Term Variability</label>
          <input
            type="number"
            step="0.001"
            value={formData.mean_value_of_short_term_variability}
            onChange={(e) => handleInputChange('mean_value_of_short_term_variability', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Histogram Data */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Histogram Width</label>
          <input
            type="number"
            value={formData.histogram_width}
            onChange={(e) => handleInputChange('histogram_width', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Histogram Mean</label>
          <input
            type="number"
            step="0.001"
            value={formData.histogram_mean}
            onChange={(e) => handleInputChange('histogram_mean', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Histogram Variance</label>
          <input
            type="number"
            step="0.001"
            value={formData.histogram_variance}
            onChange={(e) => handleInputChange('histogram_variance', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handlePredict}
          disabled={loading}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Predicting...' : 'Predict Risk Level'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {prediction && (
        <div className="space-y-4">
          {/* Main Risk Display */}
          <div className={`p-6 rounded-lg border-2 ${getRiskColor(prediction)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getRiskIcon(prediction)}
                <div>
                  <h3 className="text-xl font-bold">ML Risk Assessment: {prediction}</h3>
                  <p className="text-sm opacity-80 mt-1">
                    Based on analysis of 21 fetal health parameters
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {prediction === 'Low' && '🟢'}
                  {prediction === 'Medium' && '🟡'}
                  {prediction === 'High' && '🔴'}
                  {prediction === 'Unknown' && '⚪'}
                </div>
                <div className="text-xs opacity-70">Risk Level</div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-teal-600" />
                <h4 className="font-semibold text-sm">Model Analysis</h4>
              </div>
              <p className="text-xs text-gray-600">
                {prediction === 'Low' && 'All parameters within normal ranges. No immediate concerns detected.'}
                {prediction === 'Medium' && 'Some parameters outside optimal range. Recommend increased monitoring.'}
                {prediction === 'High' && 'Multiple critical parameters detected. Immediate medical evaluation required.'}
                {prediction === 'Unknown' && 'ML model temporarily unavailable. Using clinical rule-based assessment.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h4 className="font-semibold text-sm">Key Indicators</h4>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Baseline: {formData.baseline_value} bpm</div>
                <div>Accelerations: {formData.accelerations}</div>
                <div>Fetal Movement: {formData.fetal_movement}</div>
                <div>Contractions: {formData.uterine_contractions}</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <h4 className="font-semibold text-sm">Recommendations</h4>
              </div>
              <div className="text-xs text-gray-600">
                {prediction === 'Low' && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>Continue routine monitoring</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>Schedule next check-up as planned</span>
                    </div>
                  </div>
                )}
                {prediction === 'Medium' && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 text-yellow-600" />
                      <span>Increase monitoring frequency</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 text-yellow-600" />
                      <span>Consider additional tests</span>
                    </div>
                  </div>
                )}
                {prediction === 'High' && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      <span>Immediate medical consultation</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      <span>Consider hospital evaluation</span>
                    </div>
                  </div>
                )}
                {prediction === 'Unknown' && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 text-gray-600" />
                      <span>Use clinical judgment</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 text-gray-600" />
                      <span>Manual parameter review</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Risk Score Visualization */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-3">Risk Score Breakdown</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Low Risk</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      prediction === 'Low' ? 'bg-green-500 w-full' : 
                      prediction === 'Medium' ? 'bg-green-500 w-1/3' : 'bg-green-500 w-1/4'
                    }`}
                  />
                </div>
                <span className="text-sm font-medium">
                  {prediction === 'Low' ? '100%' : prediction === 'Medium' ? '33%' : '25%'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Medium Risk</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      prediction === 'Medium' ? 'bg-yellow-500 w-full' : 
                      prediction === 'High' ? 'bg-yellow-500 w-1/3' : 'bg-yellow-500 w-0'
                    }`}
                  />
                </div>
                <span className="text-sm font-medium">
                  {prediction === 'Medium' ? '100%' : prediction === 'High' ? '33%' : '0%'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Risk</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      prediction === 'High' ? 'bg-red-500 w-full' : 'bg-red-500 w-0'
                    }`}
                  />
                </div>
                <span className="text-sm font-medium">
                  {prediction === 'High' ? '100%' : '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLRiskPredictor;
