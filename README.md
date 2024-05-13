# Calculadora de fechas de inversión

## Datos del proyecto
El proyecto está dividido en dos directorios:
- Backend (Django)
- Frontend (Angular)

Base de datos a utilizar: Postgres

### Endpoints
El backend cuenta con cinco endpoints. Dos de ellos para manejar los tokens de JWT:

#### Para obtener el token de acceso:
```
POST api/token/
``` 

#### Para generar un nuevo token de acceso:
```
POST api/token/refresh/
``` 

Los otros tres nos dan información de los productos y la calculadora:

#### Obtiene la lista de todos los productos con toda su información:
```
GET api/products/
``` 

#### Obtiene la lista de todos los productos con su id y nombre:
```
GET api/products_short/
``` 

#### Ejecuta el servicio que calcula las fechas de inversión
```
POST api/calculate/
```

### Modelos
La base de datos cuenta con los siguientes modelos:
- **Product.** Se refiere al producto de inversión que se selecciona para calcular las fechas
  - Days LTE => Cantidad de días a sumar cuando la hora de creación de la inversión es menor o
igual a la hora operativa.
  - Days GT => Cantidad de días a sumar cuando la hora de creación de la inversión es mayor a la
hora operativa.
  - Days LTE Reinvest => Cantidad de días a sumar cuando la hora de creación de la inversión es menor o
igual a la hora operativa y es una reinversión.
  - Days GT Reinvest => Cantidad de días a sumar cuando la hora de creación de la inversión es mayor a la
hora operativa y es una reinversión.
- **Holiday.** Modelo para declarar los días festivos.
- **FundsSetting.** Contiene un elemento para establecer la hora operativa. Por defecto es: 10:30 AM.

## Backend
Para inicializar y ejecutar el servidor del backend seguir los siguientes pasos:

### 1. Configurar el entorno virtual
Abre una terminal en el directorio backend del proyecto y crea un entorno virtual usando virtualenv.
```
virtualenv venv
```

Activa el entorno virtual:

- En Windows:
```
  venv\Scripts\activate
```

- En macOS/Linux:

```
source venv/bin/activate
```

### 2. Instalar Dependencias

1. Asegúrate de estar en el entorno virtual.
2. Instala las dependencias del proyecto desde el archivo requirements.txt.
```
pip install -r requirements.txt
```
### 3. Crear y Configurar la Base de Datos
1. Crea una nueva base de datos de Postgres
```postgresql
 CREATE DATABASE alphadb;
```
2. En el archivo de ambiente (.env) que fue enviado asegurate de tener los siguientes datos de la base de datos y conexión completos:
   - DB_NAME
   - DB_USER
   - DB_PASSWORD
   - DB_HOST
   - DB_PORT

3. Crea el contenido de la base de datos ejecutando las migraciones:
```
python manage.py migrate
```

###  4. Crear un Superusuario
1. Crea un superusuario para acceder al panel de administración de Django y realizar tareas administrativas:
```
python manage.py createsuperuser
```
Sigue las instrucciones en pantalla para configurar el usuario.

### 5. Ejecutar el servidor
1. Inicia el servidor de desarrollo de Django:
```
python manage.py runserver
```
2. Para acceder al panel de administración, ve a http://127.0.0.1:8000/admin/ e inicia sesión con las credenciales del superusuario que creaste.

## Frontend

### 1. Instalar Dependencias (Node Modules)
1. Dirígete al directorio 'frontend'.
2. Instala las dependencias del proyecto
```
  npm install
```
### 2. Iniciar el Servidor de Desarrollo
1. Una vez que todas las dependencias estén instaladas, puedes iniciar el servidor utilizando el siguiente comando:
```
  ng serve
```
La aplicación estará disponible en http://localhost:4200/

## Utilizando la web
La pagina web cuenta con dos pantallas: Login y Calculadora.

- **Login.** Puedes entrar utilizando tu superuser creado anteriormente en django.
- **Calculadora.** Se te presentarán los datos requeridos para calcular las fechas de inversión.
  - Tomar en cuenta que el selector de fecha también incluye la hora de creación dentro del mismo campo.
  - Hacer clic en el botón Calcular para generar los detalles de fecha de inicio y final junsto al plazo real de la inversión.