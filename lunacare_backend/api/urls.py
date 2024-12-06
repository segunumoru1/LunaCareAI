from django.urls import path
from .views import DemoApiView, OpenAIChatView, TextToSpeechView

urlpatterns = [
    path('api/', DemoApiView.as_view(), name='api-view'),
    path('openai-chat/', OpenAIChatView.as_view(), name='openai-chat'),
    path('text-to-speech/', TextToSpeechView.as_view(), name='text_to_speech'),
]