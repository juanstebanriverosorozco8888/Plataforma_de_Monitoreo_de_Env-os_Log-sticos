from rest_framework import serializers
from .models import Clientes


class ClientesSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Clientes.
    Convierte objetos Energizante a JSON y viceversa.
    """

    class Meta:
        model = Clientes
        fields = "__all__"
        read_only_fields = ["id", "fecha_registro"]
