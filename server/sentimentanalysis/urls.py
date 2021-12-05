from django.urls import path
from sentimentanalysis.views import AnalyzerView


urlpatterns = [
    path('analyze', AnalyzerView.as_view()),
]
