from rest_framework import viewsets
from drf_spectacular.utils import extend_schema
from .models import Cliente
from .serializers import ClienteSerializer

@extend_schema(tags=['Clientes'])
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
