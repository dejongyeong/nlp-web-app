from rest_framework import serializers
from rest_framework.serializers import Serializer

# series allow complex data to be converted to native Python and rendered
# into JSON, XML or other content types
class AnalyzerSerializer(Serializer):
    sentence = serializers.CharField(max_length=None, trim_whitespace=True, allow_blank=False)
    option = serializers.CharField(max_length=None, trim_whitespace=True, allow_blank=False)
