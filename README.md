# TRABAJO FINAL CÁTEDRA APLICACIONES 1
Trabajo para la cátedra Aplicaciones I de la UPSO, dictada en el segundo semestre del año 2020.
Antes de correr el sistema es prudente leer las siguientes consideraciones:
## INFORMACIÓN ÚTIL
- El script de la base datos se entrega en un archivo separado llamado `scrips.zip`.
- Los archivos para testear se entregan en un archivo separado llamado `datos_prueba.zip`.
- La configuracion de la base de datos está en `backend/config.php`.
- La dirección a la que el frontend dirige las consultas asincrónicas se encuentra en `frontend/js/servicios/apicalls.js` (por defecto es `http://localhost/empresa/backend/`).

## PASOS
1. Abrir el PSQL (SQL Shell) y loguearse.
2. Crear la BD: `CREATE DATABASE tp_aplicaciones`
3. Entrar a la BD: `\c tp_aplicaciones`
4. Copiar las tablas y datos del backup a la BD: `\i 'ruta/al/archivo/tablas_y_datos.sql'`
5. Crear el usuario: `CREATE USER usuario_tp WITH ENCRYPTED PASSWORD '123456';`
6. Darle privilegios: `GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO usuario_tp;`
7. Si la BD y el usuario que se pretenden usar no son los indicados en los pasos anteriores, se deben modificar por los correctos en el archivo php de configuración.