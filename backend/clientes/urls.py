from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientesViewSet

# Crear un router y registrar el ViewSet
router = DefaultRouter()
router.register(r'clientes', ClientesViewSet , basename='clientes')

urlpatterns = [
    path('', include(router.urls)),
]
