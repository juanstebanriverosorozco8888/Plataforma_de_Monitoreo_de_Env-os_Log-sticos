from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransportistaViewSet

# Crear un router y registrar el ViewSet

router = DefaultRouter()
router.register(r"transportista", TransportistaViewSet, basename="transportista")

urlpatterns = [path("", include(router.urls))]
