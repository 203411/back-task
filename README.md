# Tasks

Este repositorio corresponde a la prueba Tecnica Backend

### Comandos

A continuación se describen los comandos disponibles en el archivo `package.json`:

- `test`: Ejecuta los casos de prueba del proyecto. Actualmente muestra un mensaje de error indicando que no se especificaron pruebas y luego finaliza con el código de salida 1.
```bash
npm run test
```

- `start:dev`: Inicia la aplicación en modo de desarrollo utilizando `ts-node-dev`. Esta herramienta reinicia automáticamente la aplicación cuando detecta cambios en los archivos fuente (`src/main.ts`).
```bash
  npm run start:dev
  ```

- `typeorm`: Ejecuta TypeORM en modo de desarrollo utilizando `typeorm-ts-node-commonjs`. TypeORM es un ORM (Mapeo Objeto-Relacional) para TypeScript y JavaScript que simplifica la interacción con la base de datos.

- `build`: Compila el proyecto utilizando el compilador TypeScript (`tsc`) y el archivo de configuración `tsconfig.build.json`. Este comando genera los archivos JavaScript compilados en la carpeta `dist`.
```bash
  npm run build
  ```

- `start`: Inicia la aplicación en modo de producción ejecutando el archivo JavaScript compilado (`src/main.js`) utilizando `node` (Se ejecuta en build, una vez que esta es creada).
```bash
  npm run start
  ```
## Carpetas
Deben crearse dos carpetas en la direccion `/src` con los nombres `images` y `logs`.

### Instalación

1. Crea un nuevo repositorio a partir de este template.
2. Navega hasta el directorio raíz del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
```bash
npm install
```
4. Ejecuta los comandos descritos anteriormente según sea necesario.

Para acceder al CRUD en un hosting, consulte el siguiente enlace:
