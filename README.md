# EVALUACION_TECNICA_GRUPO_CASTORES

IDE: IntelliJ IDEA Community Edition 2024.2.4

Versión del lenguaje de programación utilizado: JAVA 21

DBMS: MySQL 8

Pasos a seguir para desplegar en local el sistema de inventario:

Para poder desplegar la BD se necita tener Docker Desktop instalado y que este ejecutandose.
Abrir nuevo CMD y ubicarse en la carpeta donde descargo este repositorio y ejecutar comando:

docker-compose up -d


Para poder desplegar los microservicios: 
Abrir nuevo CMD y ubicarse en la carpeta donde descargo este repositorio y ejecutar secuencialmente estos comandos:

java -jar ".\BackEnd\ServicioEureka-0.0.1-SNAPSHOT.jar"

----> (IMPORTANTE DESPUES DE EJECUTAR EL COMANDO DE ARRIBA ESPERAR 10 SEGUNDOS!!!!) <----



Abrir nuevo CMD y ubicarse en la carpeta donde descargo este repositorio y ejecutar secuencialmente estos comandos:

java -jar ".\BackEnd\api-gateway-0.0.1-SNAPSHOT.jar"



Abrir nuevo CMD y ubicarse en la carpeta donde descargo este repositorio y ejecutar secuencialmente estos comandos:

java -jar ".\BackEnd\ServicioAutenticacion-0.0.1-SNAPSHOT.jar"



Abrir nuevo CMD y ubicarse en la carpeta donde descargo este repositorio y ejecutar secuencialmente estos comandos:

java -jar ".\BackEnd\ModuloInventario-0.0.1-SNAPSHOT.jar"



Tener instalado Node.js
Abrir nuevo CMD ubicarse en la carpeta donde descargo este repositorio y ejecutar estos comandos secuencialmente:

cd ".\FrontEnd\SistemaDeInventarioPaginaWeb"

npm install

npm run dev

NO CERRAR NINGUNA VENTANA DE CMD
Abrir cualquier navegador y acceder a esta url: http://localhost:5173/

IMPORTANTE:
USAR USUARIO CON ROL DE ADMINISTRADOR: Juan Perez
CON CONTRASEÑA: root

USAR USUARIO CON ROL DE ALMACENISTA: Luis Roberto
CON CONTRASEÑA: root

LISTO!!!