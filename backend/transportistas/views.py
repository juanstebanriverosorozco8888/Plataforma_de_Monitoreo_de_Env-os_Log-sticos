from rest_framework import viewsets
from drf_spectacular.utils import extend_schema
from .models import Transportista
from .serializers import TransportistaSerializer

@extend_schema(tags=['Transportistas'])
class TransportistaViewSet(viewsets.ModelViewSet):
    queryset = Transportista.objects.all()
    serializer_class = TransportistaSerializer
