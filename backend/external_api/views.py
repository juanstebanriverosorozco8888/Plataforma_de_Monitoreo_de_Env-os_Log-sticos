from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

class ExternalTrackingView(APIView):
    def get(self, request, tracking_number):
        # Simulación de respuesta de API externa
        data = {
            "tracking_number": tracking_number,
            "status": "in_transit",
            "location": "Bogotá - Centro Logístico",
            "timestamp": datetime.now().isoformat()
        }
        return Response(data)
