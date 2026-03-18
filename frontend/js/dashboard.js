document.addEventListener('DOMContentLoaded', async () => {
    try {
        const envios = await getEnvios();
        document.getElementById('total-envios').textContent = envios.length;
        const recientes = envios.slice(-5).reverse();
        const list = document.getElementById('envios-recientes');
        list.innerHTML = '';
        recientes.forEach(envio => {
            const li = document.createElement('li');
            li.textContent = `${envio.tracking_number} - ${envio.estado_actual}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error cargando dashboard:', error);
    }
});