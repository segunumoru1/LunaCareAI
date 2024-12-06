from django.urls import path
from .views import DemoApiView

urlpatterns = [
    path('api/', DemoApiView.as_view(), name='api-view'),
]