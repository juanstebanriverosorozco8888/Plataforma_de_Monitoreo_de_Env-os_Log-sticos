from rest_framework import serializers
from .models import Transportista


class TransportistaSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Transportista.
    Convierte objetos Transpotista a JSON y viceversa.
    """


class Meta:
    model = Transportista
    fields = "__all__"
    read_only_fields = ["id"]
