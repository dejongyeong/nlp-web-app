from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AnalyzerSerializer

class AnalyzerView(APIView):
    def post(self, request):
        # input request example - data: {sentence: today is a good day}
        serializer = AnalyzerSerializer(data=request.data)
        if serializer.is_valid():
            # TODO: Integrate the ML model here and pass to serializer: might need to change data type accordingly
            return Response({'status': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
