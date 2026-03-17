import { z } from 'zod';

export const patientSurveySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(12, 'Must be a valid age').max(65, 'Must be a valid age'),
  pregnancy_week: z.number().min(1, 'Cannot be less than 1').max(42, 'Cannot exceed 42 weeks'),
  
  baseline_value: z.number().min(0, 'Required'),
  accelerations: z.number().min(0, 'Required'),
  fetal_movement: z.number().min(0, 'Required'),
  uterine_contractions: z.number().min(0, 'Required'),
  light_decelerations: z.number().min(0, 'Required'),
  severe_decelerations: z.number().min(0, 'Required'),
  prolongued_decelerations: z.number().min(0, 'Required'),
  abnormal_short_term_variability: z.number().min(0, 'Required'),
  mean_value_of_short_term_variability: z.number().min(0, 'Required'),
  percentage_of_time_with_abnormal_long_term_variability: z.number().min(0, 'Required'),
  mean_value_of_long_term_variability: z.number().min(0, 'Required'),
  histogram_width: z.number().min(0, 'Required'),
  histogram_min: z.number().min(0, 'Required'),
  histogram_max: z.number().min(0, 'Required'),
  histogram_number_of_peaks: z.number().min(0, 'Required'),
  histogram_number_of_zeroes: z.number().min(0, 'Required'),
  histogram_mode: z.number().min(0, 'Required'),
  histogram_mean: z.number().min(0, 'Required'),
  histogram_median: z.number().min(0, 'Required'),
  histogram_variance: z.number().min(0, 'Required'),
  histogram_tendency: z.number().min(-1, 'Required').max(1, 'Tendency must be between -1 and 1'),
});

export type PatientSurveyFormValues = z.infer<typeof patientSurveySchema>;
