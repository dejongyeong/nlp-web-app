from django.apps import AppConfig
from model.prediction import BertPredictor
from model.prediction import MNBPredictor

class SentimentanalysisConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sentimentanalysis'
    bert = BertPredictor()      # reduce overhead
    mnb = MNBPredictor()