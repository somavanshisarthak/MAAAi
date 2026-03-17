import joblib
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "app", "ml", "fetal.pkl")

print(f"Loading model from: {MODEL_PATH}")
try:
    loaded_obj = joblib.load(MODEL_PATH)
    print(f"Loaded object type: {type(loaded_obj)}")
    print(f"Loaded object dir: {dir(loaded_obj)}")
    if isinstance(loaded_obj, dict):
        print(f"Loaded object is a dict with keys: {loaded_obj.keys()}")
        if 'model' in loaded_obj:
            model = loaded_obj['model']
            print(f"Extracted model from dict, type: {type(model)}")
        else:
            print("No 'model' key in dict")
    else:
        model = loaded_obj

    if hasattr(model, 'predict'):
        print("Model has predict method.")
        # Try a dummy prediction
        dummy_features = np.zeros((1, 21))
        pred = model.predict(dummy_features)
        print(f"Dummy prediction output: {pred}")
    else:
        print("Model DOES NOT have predict method.")
except Exception as e:
    print(f"Error loading model: {e}")
