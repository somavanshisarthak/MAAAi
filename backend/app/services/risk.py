from app.ml.predict import predict_ml, get_model_status

def predict_risk(data):
    """
    Predicts risk level using ML model or rule-based fallback.
    
    Args:
        data: Dictionary containing fetal health parameters
        
    Returns:
        Dictionary with risk level and prediction details
    """
    features = [
        data.get("baseline_value", 0),
        data.get("accelerations", 0),
        data.get("fetal_movement", 0),
        data.get("uterine_contractions", 0),
        data.get("light_decelerations", 0),
        data.get("severe_decelerations", 0),
        data.get("prolongued_decelerations", 0),
        data.get("abnormal_short_term_variability", 0),
        data.get("mean_value_of_short_term_variability", 0),
        data.get("percentage_of_time_with_abnormal_long_term_variability", 0),
        data.get("mean_value_of_long_term_variability", 0),
        data.get("histogram_width", 0),
        data.get("histogram_min", 0),
        data.get("histogram_max", 0),
        data.get("histogram_number_of_peaks", 0),
        data.get("histogram_number_of_zeroes", 0),
        data.get("histogram_mode", 0),
        data.get("histogram_mean", 0),
        data.get("histogram_median", 0),
        data.get("histogram_variance", 0),
        data.get("histogram_tendency", 0)
    ]

    result_code = predict_ml(features)
    model_status = get_model_status()
    
    # Map result code to risk level
    risk_mapping = {
        1: "Low",
        2: "Medium", 
        3: "High",
        0: "Unknown"
    }
    
    risk_level = risk_mapping.get(result_code, "Unknown")
    
    return {
        "risk_level": risk_level,
        "risk_code": result_code,
        "model_status": model_status,
        "features_analyzed": len(features),
        "prediction_method": "ML Model" if model_status["model_loaded"] else "Rule-based Simulation"
    }

def get_risk_explanation(risk_level: str) -> dict:
    """
    Provides detailed explanation for each risk level
    """
    explanations = {
        "Low": {
            "description": "Normal fetal health indicators detected",
            "recommendations": [
                "Continue routine prenatal care",
                "Schedule regular check-ups as planned",
                "Maintain healthy lifestyle",
                "Monitor fetal movements regularly"
            ],
            "urgency": "Low",
            "follow_up": "Next routine appointment"
        },
        "Medium": {
            "description": "Some parameters outside optimal range",
            "recommendations": [
                "Increase monitoring frequency",
                "Consider additional diagnostic tests",
                "Consult with healthcare provider",
                "Monitor for changes in fetal activity"
            ],
            "urgency": "Medium", 
            "follow_up": "Within 1-2 weeks"
        },
        "High": {
            "description": "Critical conditions requiring immediate attention",
            "recommendations": [
                "Immediate medical consultation required",
                "Consider hospital evaluation",
                "Continuous monitoring recommended",
                "Prepare for potential intervention"
            ],
            "urgency": "High",
            "follow_up": "Immediately"
        },
        "Unknown": {
            "description": "ML model temporarily unavailable",
            "recommendations": [
                "Use clinical judgment",
                "Manual parameter review",
                "Consult with senior healthcare provider",
                "Consider backup diagnostic methods"
            ],
            "urgency": "Unknown",
            "follow_up": "Based on clinical assessment"
        }
    }
    
    return explanations.get(risk_level, explanations["Unknown"])