import joblib
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "fetal.pkl")

# Load model globally on startup once
model = None
model_loaded = False
try:
    loaded_obj = joblib.load(MODEL_PATH)
    # Sometimes models are saved as dicts with metadata
    if isinstance(loaded_obj, dict):
        # We assume the actual model is keyed by 'model' or similar.
        # Often it's 'model' or 'pipeline'
        model = loaded_obj.get('model', loaded_obj)
    else:
        model = loaded_obj
    model_loaded = True
    print("✅ ML model loaded successfully from fetal.pkl")
except FileNotFoundError:
    print(f"⚠️  Model file not found at {MODEL_PATH}")
except Exception as e:
    print(f"⚠️  Could not load ML model due to missing dependencies: {e}")
    print("🔄 Using rule-based simulation instead")
    model = None
    model_loaded = False

def rule_based_risk_prediction(features: list) -> int:
    """
    Rule-based simulation of ML model prediction.
    This mimics the behavior of a trained fetal health model.
    """
    try:
        baseline_value = features[0] if len(features) > 0 else 120
        accelerations = features[1] if len(features) > 1 else 0
        fetal_movement = features[2] if len(features) > 2 else 0
        uterine_contractions = features[3] if len(features) > 3 else 0
        severe_decelerations = features[5] if len(features) > 5 else 0
        abnormal_variability = features[7] if len(features) > 7 else 0
        
        # Risk scoring logic based on medical guidelines
        risk_score = 0
        
        # Baseline heart rate assessment
        if baseline_value < 110 or baseline_value > 160:
            risk_score += 2
        elif baseline_value < 120 or baseline_value > 150:
            risk_score += 1
            
        # Accelerations (good sign)
        if accelerations > 0:
            risk_score -= 1
            
        # Fetal movement
        if fetal_movement == 0:
            risk_score += 1
            
        # Uterine contractions
        if uterine_contractions > 0.01:
            risk_score += 1
            
        # Severe decelerations (critical)
        if severe_decelerations > 0:
            risk_score += 3
            
        # Abnormal variability
        if abnormal_variability > 50:
            risk_score += 2
        elif abnormal_variability > 20:
            risk_score += 1
            
        # Convert score to risk level
        if risk_score >= 4:
            return 3  # High Risk
        elif risk_score >= 2:
            return 2  # Medium Risk
        else:
            return 1  # Low Risk
            
    except Exception as e:
        print(f"Error in rule-based prediction: {e}")
        return 1  # Default to Low Risk

def predict_ml(features: list) -> int:
    """
    Takes a list of 21 features from the CTG fetal health dataset
    and returns a risk level (1=Low, 2=Medium, 3=High).
    
    Uses the actual ML model if available, otherwise falls back to rule-based prediction.
    """
    if model_loaded and model is not None:
        try:
            features_array = np.array(features).reshape(1, -1)
            prediction = model.predict(features_array)
            result = int(prediction[0])
            print(f"🤖 ML Model Prediction: {result}")
            return result
        except Exception as e:
            print(f"⚠️  ML model prediction failed: {e}")
            print("🔄 Falling back to rule-based prediction")
            return rule_based_risk_prediction(features)
    else:
        print("🧠 Using rule-based ML simulation")
        return rule_based_risk_prediction(features)

def get_model_status() -> dict:
    """
    Returns the status of the ML model loading
    """
    return {
        "model_loaded": model_loaded,
        "model_path": MODEL_PATH,
        "using_fallback": not model_loaded,
        "message": "ML model loaded" if model_loaded else "Using rule-based simulation"
    }