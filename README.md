Guía para Ejecutar el Proyecto
1. Clonar el Repositorio
Primero, clona el repositorio desde GitHub. Asegúrate de tener instalado git en tu sistema.

bash
Copy
git clone https://github.com/YisusDevZer0/task-manager
cd tu-repositorio
2. Estructura del Proyecto
El proyecto está dividido en dos carpetas principales:

server: Contiene el backend (API en Express y MongoDB).

client: Contiene el frontend (React y Redux).

3. Configurar el Backend (Server)
a. Instalar Dependencias
Navega a la carpeta server e instala las dependencias necesarias:

bash
Copy
cd server
npm install
b. Archivo .env (Ya Configurado)
El archivo .env ya está configurado en el repositorio con las siguientes variables:

env
Copy
PORT=5000
MONGO_URI=mongodb://localhost:27017/tu-base-de-datos
JWT_SECRET=tu-clave-secreta
PORT: Puerto en el que correrá el servidor (por defecto, 5000).

MONGO_URI: URL de conexión a MongoDB. Asegúrate de tener MongoDB instalado y corriendo localmente.

JWT_SECRET: Clave secreta para firmar los tokens JWT.

c. Iniciar el Servidor
Ejecuta el servidor con el siguiente comando:

bash
Copy
npm start
El servidor debería iniciarse y mostrar un mensaje como:

Copy
Servidor corriendo en http://localhost:5000
Conectado a MongoDB
4. Configurar el Frontend (Client)
a. Instalar Dependencias
Navega a la carpeta client e instala las dependencias necesarias:

bash
Copy
cd ../client
npm install
b. Archivo .env (Ya Configurado)
El archivo .env ya está configurado en el repositorio con la siguiente variable:

env
Copy
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_URL: URL del backend (servidor). Asegúrate de que coincida con el puerto configurado en el servidor.

c. Iniciar el Cliente
Ejecuta el cliente con el siguiente comando:

bash
Copy
npm start
El cliente debería iniciarse y abrir automáticamente una ventana del navegador en http://localhost:3000.

5. Probar la Aplicación
Una vez que tanto el servidor como el cliente estén corriendo, puedes probar la aplicación:

Registro y Autenticación: Si tu aplicación tiene un sistema de autenticación, regístrate o inicia sesión.

Crear Tareas: Usa el formulario para crear nuevas tareas.

Ver Tareas: Las tareas creadas deberían aparecer en la tabla.

Editar/Eliminar Tareas: Prueba las funcionalidades de editar y eliminar tareas.

6. Instrucciones para Clonar y Ejecutar desde GitHub
Si alguien más va a clonar y ejecutar tu proyecto, puedes proporcionar las siguientes instrucciones:

a. Clonar el Repositorio
bash
Copy
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
b. Configurar y Ejecutar el Backend
bash
Copy
cd server
npm install
npm start
c. Configurar y Ejecutar el Frontend
bash
Copy
cd ../client
npm install
npm start
7. Consideraciones Adicionales
MongoDB: Asegúrate de tener MongoDB instalado y corriendo en tu sistema. Si no lo tienes, puedes descargarlo desde aquí.

Node.js y npm: Asegúrate de tener Node.js y npm instalados. Puedes verificar la instalación con:

bash
Copy
node -v
npm -v
Puertos: Si los puertos 3000 (cliente) o 5000 (servidor) están ocupados, cambia las variables de entorno correspondientes en los archivos .env.

8. Resumen de Comandos
Aquí tienes un resumen de los comandos clave:

Backend (Server)
bash
Copy
cd server
npm install
npm start
Frontend (Client)
bash
Copy
cd client
npm install
npm start
9. Posibles Errores y Soluciones
Error de Conexión a MongoDB: Asegúrate de que MongoDB esté corriendo y que la URL en .env sea correcta.

Error de CORS: Si el cliente no puede conectarse al servidor, verifica que REACT_APP_API_URL en el cliente coincida con la URL del servidor.

Errores de Dependencias: Si hay errores al instalar dependencias, intenta eliminar la carpeta node_modules y el archivo package-lock.json, luego ejecuta npm install nuevamente.

10. Nota sobre los Archivos .env
Los archivos .env ya están configurados en el repositorio con los valores necesarios para que el proyecto funcione correctamente. No es necesario modificarlos a menos que quieras cambiar la configuración (por ejemplo, el puerto del servidor o la URL de MongoDB).

