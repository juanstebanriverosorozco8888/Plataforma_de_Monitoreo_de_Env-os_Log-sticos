from django.db import models


# Create your models here.
class Clientes(models.Model):
    """
    Modelo para almacenar información de Clientes.
    """

    nombre = models.CharField(max_length=200, help_text="Nombre del Cliente")

    correo = models.CharField(max_length=200, help_text="Correo electrónico")

    teléfono = models.IntegerField(help_text="Número de Teléfono")

    empresa = models.CharField(max_length=200, help_text="Nombre de su empresa")

    fecha_registro = models.DateTimeField(
        auto_now_add=True, help_text="Fecha de creación del registro"
    )

