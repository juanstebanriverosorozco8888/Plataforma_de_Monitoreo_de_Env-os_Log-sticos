from django.urls import path
from .views import TrackingView, TrackingHistoryView, TrackingStatusView, TrackingSyncView

urlpatterns = [
    path('event', TrackingView.as_view(), name='tracking-event'),
    path('<str:tracking_number>/history', TrackingHistoryView.as_view(), name='tracking-history'),
    path('<str:tracking_number>/', TrackingStatusView.as_view(), name='tracking-status'),
    path('sync/<str:tracking_number>', TrackingSyncView.as_view(), name='tracking-sync'),
]