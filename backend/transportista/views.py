from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transportista
from .serializers import TransportistaSerializer

# Create your views here.

class TransportistaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el modelo Clientes.
    Proporciona acciones CRUD automáticas:
    - GET /transportista/ → listar todos
    - GET /transportista/{id}/ → obtener uno
    - POST /transportista/ → crear
    - PUT /transportista/{id}/ → actualizar
    - DELETE /transportista/{id}/ → eliminar
    """
    queryset = Transportista()
    serializer_class = TransportistaSerializer
    
