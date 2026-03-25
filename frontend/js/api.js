const API_URL = "http://127.0.0.1:8000/";

async function apiRequest(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };
    const response = await fetch(url, config);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
}

// Clientes
async function getClientes() {
    return apiRequest('api/clientes/clientes/');
}

async function createCliente(data) {
    return apiRequest('api/clientes/clientes/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Transportistas
async function getTransportistas() {
    return apiRequest('api/transportistas/transportistas/');
}

async function createTransportista(data) {
    return apiRequest('api/transportistas/transportistas/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Envios
async function getEnvios() {
    return apiRequest('api/envios/envios/');
}

async function createEnvio(data) {
    return apiRequest('api/envios/envios/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

async function getEnvio(trackingNumber) {
    return apiRequest(`api/envios/envios/${trackingNumber}/`);
}

async function updateEnvio(trackingNumber, data) {
    return apiRequest(`api/envios/envios/${trackingNumber}/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
}

// Tracking
async function getTrackingStatus(trackingNumber) {
    return apiRequest(`api/tracking/${trackingNumber}/`);
}

async function getTrackingHistory(trackingNumber) {
    return apiRequest(`api/tracking/${trackingNumber}/history`);
}