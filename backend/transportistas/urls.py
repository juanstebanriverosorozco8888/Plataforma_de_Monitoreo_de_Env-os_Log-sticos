from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransportistaViewSet

router = DefaultRouter()
router.register(r'', TransportistaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]