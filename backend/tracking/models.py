from django.db import models

class Tracking(models.Model):
    tracking_number = models.CharField(max_length=50)
    estado = models.CharField(max_length=20)
    ubicacion = models.CharField(max_length=100)
    fecha_evento = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField()

    def __str__(self):
        return f"{self.tracking_number} - {self.estado}"
