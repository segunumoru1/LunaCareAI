from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ApiDemoModel
from .serializers import DemoSerializer
from openai import OpenAI
from django.conf import settings
import logging
logger = logging.getLogger(__name__)

class DemoApiView(APIView):
    '''
    a view to test the Djanog api
    '''
    def get(self, request):
        item = ApiDemoModel.objects.all()
        serializer = DemoSerializer(item, many=True)
        return Response(serializer.data)



# Set the OpenAI API key from Django settings
client = OpenAI(
  api_key=settings.OPENAI_API_KEY,  # this is also the default, it can be omitted
)


class OpenAIChatView(APIView):
    def post(self, request):
        user_input = request.data.get('user_input')

        if not user_input:
            return Response({"error": "No user input provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Use the updated API method for chat completions
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "user", "content": user_input}
                ],
                max_tokens=100,
                temperature=0.7,
            )

            # Extract the assistant's reply
            assistant_reply = response.choices[0].message.content.strip()

            return Response({"response": assistant_reply})

        except Exception as e:  # Correct exception handling
            logger.error(f"Error calling OpenAI API: {(e)}")
            return Response({"error": "An error occurred while processing your request."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


