document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transportista-form');
    const list = document.getElementById('transportistas-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            nombre: document.getElementById('nombre').value,
            tipo_servicio: document.getElementById('tipo_servicio').value,
            pais: document.getElementById('pais').value,
            endpoint_api: document.getElementById('endpoint_api').value,
        };
        try {
            await createTransportista(data);
            form.reset();
            loadTransportistas();
        } catch (error) {
            console.error('Error creando transportista:', error);
        }
    });

    async function loadTransportistas() {
        try {
            const transportistas = await getTransportistas();
            list.innerHTML = '';
            transportistas.forEach(transportista => {
                const li = document.createElement('li');
                li.textContent = `${`✈ ${transportista.nombre}`} - ${`⛟ ${transportista.tipo_servicio}`} - ${`⚐ ${transportista.pais}`}`;
                list.appendChild(li);
            });
        } catch (error) {
            console.error('Error cargando transportistas:', error);
        }
    }

    loadTransportistas();
});