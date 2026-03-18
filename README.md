# Plataforma de Monitoreo de Envíos Logísticos

Proyecto full-stack para administrar toda la cadena logística:
- clientes
- transportistas
- envíos
- tracking (eventos y estado de paquetes)

Incluye backend en Django (REST API) y frontend estático en HTML/CSS/JS.

---

## 📁 Estructura de carpetas

- `backend/`
  - Django project + apps y lógica principal.
  - `config/`: ajustes globales, rutas, ASGI/WGSI y settings.
  - `clientes/`: modelo, serializers, vistas, rutas y migraciones para clientes.
  - `transportistas/`: modelo, serializers, vistas, rutas y migraciones para transportistas.
  - `envios/`: modelo, serializers, vistas, rutas y migraciones para envíos.
  - `tracking/`: modelo, serializers, vistas y rutas para eventos de tracking.
  - `external_api/`: API externa simulada (endpoint `external-api/tracking/{tracking_number}`) que devuelve status de tracking falso para demo.
  - `db.sqlite3`: base de datos embebida SQLite (estado de la app).
  - `manage.py`: utilidad de Django.

- `frontend/`
  - HTML estático para interfaz de usuario:
    - `index.html`, `clientes.html`, `transportistas.html`, `envios.html`, `tracking.html`
  - `css/style.css`: diseño y apariencia profesional.
  - `js/api.js`: cliente HTTP (fetch) al backend REST.
  - `js/*.js`: lógica por página (crear/ver datos con API).

- `.venv/` (opcional, no versionado normalmente)
  - Entorno virtual Python con dependencias del proyecto.
  - Contiene binarios de Python, pip y paquetes instalados.
  - Evita conflictos de versiones globales y asegura reproducibilidad.

---

## 🔗 Relación Frontend ↔ Backend

1. Frontend carga con HTML estático desde `frontend/*.html`.
2. Cada página incluye `js/api.js` y un script específico (`js/clientes.js`, `js/transportistas.js`, etc.).
3. Los scripts llaman a endpoints REST definidos en el backend.
4. Backend expone JSON y CRUD completo; frontend renderiza datos recibidos.
5. Ejemplo:
   - `GET /api/clientes/clientes/` trae clientes.
   - `POST /api/envios/envios/` crea un nuevo envío.

Aun el frontend es estático, se usa para UI de administración/herramienta sin SSR en Django.

---

## 🌐 Rutas (endpoints)

### Backend principal

- `GET /api/clientes/clientes/` (listar)
- `POST /api/clientes/clientes/` (crear)
- `GET /api/clientes/clientes/{id}/` (detalles)
- `PATCH/PUT/DELETE /api/clientes/clientes/{id}/`

- `GET /api/transportistas/transportistas/`
- `POST /api/transportistas/transportistas/`
- `GET /api/transportistas/transportistas/{id}/`
- etc.

- `GET /api/envios/envios/`
- `POST /api/envios/envios/`
- `GET /api/envios/envios/{tracking_number}/`
- `PATCH /api/envios/envios/{tracking_number}/`

- `POST /api/tracking/event` (agrega evento manual)
- `GET /api/tracking/{tracking_number}/` (estado + último evento)
- `GET /api/tracking/{tracking_number}/history` (histórico eventos)
- `POST /api/tracking/sync/{tracking_number}` (forzar sincronización con external_api)

- `GET /external-api/tracking/{tracking_number}/` (API externa simulado)

### Documentación y auth

- `POST /api/token/`: login JWT
- `POST /api/token/refresh/`
- `GET /api/schema/` (OpenAPI JSON)
- `GET /api/schema/swagger-ui/` (Swagger GUI)
- `GET /api/schema/redoc/` (ReDoc)

---

## ⚙️ Configuración clave

### `backend/config/settings.py`

- `INSTALLED_APPS` incluye: `rest_framework`, `drf_spectacular`, apps propias.
- DRF default schema:
  - `'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema'`
- `SPECTACULAR_SETTINGS` (tags, info del API, etc.)
- Base de datos `sqlite3` en `db.sqlite3`.

### `backend/config/urls.py`

- Incluye rutas app en segmentos:
  - `path('api/clientes/', include('clientes.urls'))`
  - `path('api/transportistas/', include('transportistas.urls'))`
  - `path('api/envios/', include('envios.urls'))`
  - `path('api/tracking/', include('tracking.urls'))`
  - `path('external-api/', include('external_api.urls'))`

---

## 🧩 Cómo funciona `external_api` en la app

- `external_api` es una app de respaldo para simular proveedor externo.
- Exponer endpoint realistas de seguimiento para uso de integración:
  - `GET /external-api/tracking/{tracking_number}/` devuelve JSON con status y ubicación.
- usada por `tracking`/`envios` para sincronizar estado interno de envíos.
- muy útil para pruebas sin dependencia de terceros reales.

---

## 🛠️ Instalación y puesta en marcha (guiada)

1. Clonar repo:
   - `git clone <repo>`
   - `cd Plataforma_de_Monitoreo_de_Envíos_Logísticos`

2. Crear y activar entorno virtual (recomendado):
   - `python -m venv .venv`
   - `.venv\Scripts\activate` (Windows)
   - `source .venv/bin/activate` (Mac/Linux)

3. Instalar dependencias:
   - `pip install -r backend/requirements.txt`

4. Migrar base de datos:
   - `cd backend`
   - `python manage.py migrate`

5. Cargar datos iniciales (opcional):
   - `python manage.py loaddata <fixtures>` (si se tienen fixtures)

6. Iniciar servidor Django:
   - `python manage.py runserver`

7. Abrir frontend en navegador:
   - `frontend/index.html`

> En producción se recomienda servir frontend desde un servidor web (Nginx) o integrarlo en Django con `StaticFiles`.

---

## 🧪 Pruebas

- Puedes ejecutar tests con:
  - `cd backend`
  - `python manage.py test`

- Asegúrate de crear un superusuario para validar /admin:
  - `python manage.py createsuperuser`

---

## 🎛️ Convenciones y buenas prácticas en el proyecto

- Modelo principal es con nombres explícitos (`Cliente`, `Transportista`, `Envio`, `Tracking`) para tener claridad semántica.
- Lógica de creación de eventos de tracking (en `envios.views`) enlaza el estado del envío con registros en `Tracking`.
- DRF ViewSets para CRUD (clientes/transportistas/envios) + APIViews para tracking, con endpoints claramente separados.
- Swagger y OpenAPI con tags (`Clientes`, `Transportistas`, `Envíos`, `Tracking`) para documentación legible por área funcional.

---

## 🧹 Limpieza y estado actual

- La tienda de datos está normalizada en SQLite; cada modelo está alineado con su respectiva app.
- CSS convertido a diseño profesional, con responsive design y experiencia consistente.
- API client JavaScript (`api.js`) mapea a rutas en `config/urls.py` para evitar desajustes entre frontend/back.

---

## 🗂️ Nota sobre `.venv`

- Carpeta que contiene entorno virtual aislado.
- No debería subirse a Git (`.gitignore`).
- Contiene:
  - `python.exe` (ejecutable)
  - paquetes instalados (`Lib/site-packages`)
  - herramientas aisladas para manejar dependencias.

---

## 💬 Conexión entre frontend y backend

- El frontend es cliente puro JavaScript y consume API REST.
- No se sirven las páginas desde Django (actúa como API only), pero si se desea, en production se puede integrar `frontend` con Django templates.
- `external_api` complementa funcionalidad de tracking, es un proveedor de datos externos que la aplicación interna usa para actualizaciones automáticas.

---

## 🚀 Mejora rápida recomendada

- Reescribir rutas para evitar `/api/clientes/clientes/` (extra nivel), por ejemplo:
  - `path('api/clientes/', include('clientes.urls'))` y en `clientes/urls.py` `r''` en router.
- Agregar CORS con `django-cors-headers` para poder consumir desde frontend hospedado en otros dominios.
- Crear workflow de pruebas para endpoints con Postman + fixture de test.

---

¡Listo! README completo y alineado con el proyecto actual.