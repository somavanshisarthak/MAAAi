from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.sql import func
from app.database import Base

class SurveyResponse(Base):
    __tablename__ = "survey_responses"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    
    baseline_value = Column(Float)
    accelerations = Column(Float)
    fetal_movement = Column(Float)
    uterine_contractions = Column(Float)
    light_decelerations = Column(Float)
    severe_decelerations = Column(Float)
    prolongued_decelerations = Column(Float)
    abnormal_short_term_variability = Column(Float)
    mean_value_of_short_term_variability = Column(Float)
    percentage_of_time_with_abnormal_long_term_variability = Column(Float)
    mean_value_of_long_term_variability = Column(Float)
    histogram_width = Column(Float)
    histogram_min = Column(Float)
    histogram_max = Column(Float)
    histogram_number_of_peaks = Column(Float)
    histogram_number_of_zeroes = Column(Float)
    histogram_mode = Column(Float)
    histogram_mean = Column(Float)
    histogram_median = Column(Float)
    histogram_variance = Column(Float)
    histogram_tendency = Column(Float)

    risk_level = Column(String)  # Will store 'Low Risk', 'Medium Risk', 'High Risk'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
