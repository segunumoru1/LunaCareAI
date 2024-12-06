from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ApiDemoModel
from .serializers import DemoSerializer

class DemoApiView(APIView):
    def get(self, request):
        item = ApiDemoModel.objects.all()
        serializer = DemoSerializer(item, many=True)
        return Response(serializer.data)
