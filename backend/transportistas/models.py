from django.db import models

class Transportista(models.Model):
    nombre = models.CharField(max_length=100)
    tipo_servicio = models.CharField(max_length=50)
    pais = models.CharField(max_length=50)
    endpoint_api = models.URLField()

    def __str__(self):
        return self.nombre
