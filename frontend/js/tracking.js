document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tracking-form');
    const resultDiv = document.getElementById('tracking-result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const trackingNumber = document.getElementById('tracking_number').value;
        console.log('Consultando tracking:', trackingNumber);
        try {
            const status = await getTrackingStatus(trackingNumber);
            console.log('Estado recibido:', status);
            const history = await getTrackingHistory(trackingNumber);
            console.log('Historial recibido:', history);

            document.getElementById('tracking-num').textContent = status.tracking_number;
            document.getElementById('estado').textContent = status.status;
            document.getElementById('ubicacion').textContent = status.last_location;
            document.getElementById('entrega').textContent = status.estimated_delivery;

            const list = document.getElementById('historial-list');
            list.innerHTML = '';
            if (history.length === 0) {
                const li = document.createElement('li');
                li.textContent = 'No hay eventos de tracking registrados aún.';
                li.style.fontStyle = 'italic';
                li.style.color = '#666';
                list.appendChild(li);
            } else {
                history.forEach(evento => {
                    const li = document.createElement('li');
                    li.textContent = `${evento.fecha_evento} - ${evento.estado} - ${evento.ubicacion}`;
                    list.appendChild(li);
                });
            }

            resultDiv.style.display = 'block';
        } catch (error) {
            console.error('Error consultando tracking:', error);
            alert('Error al consultar el tracking');
        }
    });
});