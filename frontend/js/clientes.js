document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cliente-form');
    const list = document.getElementById('clientes-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            empresa: document.getElementById('empresa').value,
        };
        console.log('Enviando datos:', data);
        try {
            const result = await createCliente(data);
            console.log('Cliente creado:', result);
            form.reset();
            loadClientes();
        } catch (error) {
            console.error('Error creando cliente:', error);
        }
    });

    async function loadClientes() {
        try {
            const clientes = await getClientes();
            list.innerHTML = '';
            clientes.forEach(cliente => {
                const li = document.createElement('li');
                li.textContent = `${`✈ ${cliente.nombre}`} - ${`✉ ${cliente.correo} - ${`☏ ${cliente.telefono}`} - ${`𖠿 ${cliente.empresa}`}`}`;
                list.appendChild(li);
            });
        } catch (error) {
            console.error('Error cargando clientes:', error);
        }
    }

    loadClientes();
});