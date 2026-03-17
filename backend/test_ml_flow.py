import requests

BASE_URL = "http://127.0.0.1:8001/api/v1"

# 1. Register
print("Registering Doctor...")
res = requests.post(f"{BASE_URL}/auth/register", json={
    "name": "Dr. Test AI",
    "email": "test@doctor.com",
    "password": "password"
})
print("Register Code:", res.status_code)

res = requests.post(f"{BASE_URL}/auth/login", data={
    "username": "test@doctor.com",
    "password": "password"
})
access_token = res.json().get("access_token")
headers = {"Authorization": f"Bearer {access_token}"}

# 2. Add Patient
print("Adding Patient...")
res = requests.post(f"{BASE_URL}/patients", headers=headers, json={
    "name": "Sample Patient ML",
    "age": 28,
    "pregnancy_week": 32,
    "village": "Delhi"
})
print("Patient Code:", res.status_code)
patient_id = res.json().get("id")
print("Patient ID:", patient_id)

# 3. Add Survey to trigger ML prediction
print("Submitting Survey...")
payload = {
    "patient_id": patient_id,
    "baseline_value": 120.0,
    "accelerations": 0.0,
    "fetal_movement": 0.0,
    "uterine_contractions": 0.0,
    "light_decelerations": 0.0,
    "severe_decelerations": 0.0,
    "prolongued_decelerations": 0.0,
    "abnormal_short_term_variability": 73.0,
    "mean_value_of_short_term_variability": 0.5,
    "percentage_of_time_with_abnormal_long_term_variability": 43.0,
    "mean_value_of_long_term_variability": 2.4,
    "histogram_width": 64.0,
    "histogram_min": 62.0,
    "histogram_max": 126.0,
    "histogram_number_of_peaks": 2.0,
    "histogram_number_of_zeroes": 0.0,
    "histogram_mode": 120.0,
    "histogram_mean": 137.0,
    "histogram_median": 121.0,
    "histogram_variance": 73.0,
    "histogram_tendency": 1.0
}
res = requests.post(f"{BASE_URL}/survey", json=payload)
print("Survey Code:", res.status_code)
print("Survey Result:", res.json())
