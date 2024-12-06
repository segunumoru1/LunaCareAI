from rest_framework import serializers
from .models import ApiDemoModel 

class DemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiDemoModel
        fields = '__all__' 