# Demo Frontend

Este es un proyecto de frontend desarrollado con Angular para gestionar usuarios. Este proyecto se conecta a un backend para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los usuarios.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Requisitos

- Node.js (v14 o superior)
- Angular CLI
- Bootstrap (para estilos)

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/CarlosPolo019/demo-frontend.git
   cd demo-frontend
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Asegúrate de que el backend esté corriendo en `http://localhost:8080/api/users`.

## Uso

1. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

2. Abre tu navegador y navega a `http://localhost:4200`.

3. Desde la interfaz, podrás:
   - Crear nuevos usuarios.
   - Editar usuarios existentes.
   - Eliminar usuarios.
   - Filtrar usuarios por nombre o correo electrónico.

## Estructura del Proyecto

```plaintext
src/
├── app/
│   ├── services/
│   │   └── users.service.ts        # Servicio para manejar la comunicación con la API
│   ├── users/
│   │   ├── users.component.ts       # Componente principal para gestionar usuarios
│   │   ├── users.component.html      # Plantilla HTML del componente
│   │   └── users.component.css       # Estilos del componente
│   ├── app.component.ts              # Componente raíz de la aplicación
│   ├── app.config.ts                 # Configuración de la aplicación
│   ├── app.routes.ts                 # Rutas de la aplicación
│   └── main.ts                       # Archivo principal de entrada
├── assets/                            # Archivos estáticos
└── styles.css                         # Estilos globales
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/mi-nueva-caracteristica`).
3. Realiza tus cambios y confirma (`git commit -m 'Agregué una nueva característica'`).
4. Envía tus cambios (`git push origin feature/mi-nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
