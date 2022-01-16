from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AnalyzerSerializer
from model.analyzer import classify_sentiment

class AnalyzerView(APIView):
    def post(self, request)->Response:
        # input request example - data: {sentence: today is a good day, option: ml}
        serializer = AnalyzerSerializer(data=request.data)
        if serializer.is_valid():
            result = classify_sentiment(sentence=serializer.data['sentence'], 
                                        option=serializer.data['option'])
            return Response({'status': 'success', 'data': result}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
