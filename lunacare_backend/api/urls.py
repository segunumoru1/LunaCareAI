from django.urls import path
from .views import DemoApiView, OpenAIChatView

urlpatterns = [
    path('api/', DemoApiView.as_view(), name='api-view'),
    path('openai-chat/', OpenAIChatView.as_view(), name='openai-chat'),
]