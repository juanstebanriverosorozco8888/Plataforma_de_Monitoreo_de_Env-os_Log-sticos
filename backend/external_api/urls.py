from django.urls import path
from .views import ExternalTrackingView

urlpatterns = [
    path('tracking/<str:tracking_number>', ExternalTrackingView.as_view(), name='external-tracking'),
]