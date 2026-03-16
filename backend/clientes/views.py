from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Clientes
from .serializers import ClientesSerializer

# Create your views here.


class ClientesViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el modelo Clientes.
    Proporciona acciones CRUD automáticas:
    - GET /clientes/ → listar todos
    - GET /clientes/{id}/ → obtener uno
    - POST /clientes/ → crear
    - PUT /clientes/{id}/ → actualizar
    - DELETE /clientes/{id}/ → eliminar
    """
    queryset = Clientes()
    serializer_class = ClientesSerializer