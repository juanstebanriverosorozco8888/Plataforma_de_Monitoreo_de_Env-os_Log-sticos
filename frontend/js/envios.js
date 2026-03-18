const list = document.getElementById('envios-list');

async function loadEnvios() {
    try {
        const envios = await getEnvios();
        list.innerHTML = '';
        envios.forEach(envio => {
            const li = document.createElement('li');
            li.textContent = `${envio.tracking_number} - ${envio.estado_actual}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error cargando envíos:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('envio-form');
    const clienteSelect = document.getElementById('cliente');
    const transportistaSelect = document.getElementById('transportista');

    // Cargar opciones
    try {
        const clientes = await getClientes();
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nombre;
            clienteSelect.appendChild(option);
        });

        const transportistas = await getTransportistas();
        transportistas.forEach(transportista => {
            const option = document.createElement('option');
            option.value = transportista.id;
            option.textContent = transportista.nombre;
            transportistaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando opciones:', error);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            tracking_number: document.getElementById('tracking_number').value,
            cliente: parseInt(document.getElementById('cliente').value),
            transportista: parseInt(document.getElementById('transportista').value),
            origen: document.getElementById('origen').value,
            destino: document.getElementById('destino').value,
        };
        try {
            await createEnvio(data);
            form.reset();
            loadEnvios();
        } catch (error) {
            console.error('Error creando envío:', error);
        }
    });

    loadEnvios();
});

const updateForm = document.getElementById('update-envio-form');
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const trackingNumber = document.getElementById('update-tracking').value;
    const estado = document.getElementById('update-estado').value;
    console.log('Actualizando envío:', trackingNumber, 'a estado:', estado);
    try {
        const result = await updateEnvio(trackingNumber, { estado_actual: estado });
        console.log('Resultado de actualización:', result);
        alert('Estado actualizado correctamente');
        updateForm.reset();
        loadEnvios();
    } catch (error) {
        console.error('Error actualizando estado:', error);
        alert('Error al actualizar el estado: ' + error.message);
    }
});