from django.db import models

# Create your models here.


class Transportista:
    """
    Modelo para almacenar información de transportistas (Proveedores).
    """

    nombre = models.CharField(max_length=200, help_text="Nombre del transportista")
    tipo_servicio = models.CharField(max_length=200, help_text="Tipo de servicio")
    pais = models.CharField(max_length=200, help_text="País")
    endpoint = models.CharField(
        max_length=200, help_text="Estado actualizado del envio"
    )
