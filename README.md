# Periódico Digital Frontend

Proyecto académico de frontend desarrollado con Angular para simular un periódico digital con noticias de educación, tecnología, turismo y comercio.

## Descripción general

La aplicación permite:
- visualizar noticias en una interfaz tipo periódico
- navegar entre distintas páginas mediante rutas
- ver el detalle completo de cada noticia
- guardar noticias como favoritas
- gestionar una pequeña lista de noticias
- contactar al periódico mediante un formulario

## Tecnologías usadas

- Angular 22
- TypeScript
- HTML
- CSS
- localStorage para persistencia de favoritos y noticias

## Estructura del proyecto

```bash
PYT-FRONT-END/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   └── news-card/
│   │   ├── models/
│   │   │   └── noticia.ts
│   │   ├── pages/
│   │   │   ├── contacto/
│   │   │   ├── detalle-noticia/
│   │   │   ├── favoritos/
│   │   │   ├── gestionar-noticias/
│   │   │   ├── home/
│   │   │   └── noticias/
│   │   ├── services/
│   │   │   └── noticias.service.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.css
│   ├── assets/
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
├── README.md
└── node_modules/
```

## Funcionalidad principal

### 1. Inicio
Muestra la portada del periódico con noticias destacadas y una estructura visual tipo editorial.

### 2. Noticias
Lista todas las noticias disponibles con información breve y enlace para ver más detalle.

### 3. Detalle de noticia
Permite abrir una noticia específica y mostrar su contenido completo con más información.

### 4. Favoritos
Muestra las noticias que el usuario ha marcado como favoritas.

### 5. Contacto
Incluye un formulario de contacto con validación básica y datos de contacto colombianos.

### 6. Gestión de noticias
Permite agregar y eliminar noticias desde la interfaz.

## Servicios y lógica

### NoticiasService
Es el servicio central del proyecto. Se encarga de:
- cargar noticias iniciales
- guardar información en localStorage
- agregar nuevas noticias
- eliminar noticias existentes
- marcar o quitar favoritos
- consultar noticias por ID
- obtener noticias destacadas

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd PYT-FRONT-END
```

2. Instala dependencias:

```bash
npm install
```

3. Ejecuta la aplicación:

```bash
npm start
```

La app queda disponible en:

```bash
http://localhost:4200/
```

## Compilar proyecto

```bash
npm run build
```

## Scripts disponibles

```bash
npm start
npm run build
npm run watch
npm test
```

## Observaciones

- Los favoritos se guardan en el navegador con `localStorage`, por lo que se mantienen aunque recargues la página.
- La fecha del encabezado se actualiza automáticamente según la fecha actual del sistema.
- El proyecto está pensado como una base sencilla, clara y apropiada para un trabajo académico de frontend.

## Autor

Proyecto desarrollado como ejercicio académico de frontend con Angular.
