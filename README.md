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

- Angular 22 (componentes standalone, control flow `@if`/`@for`, signals)
- TypeScript
- HTML
- CSS
- localStorage para persistencia de favoritos y noticias

## Estructura del proyecto

```bash
PYT-FRONT-END/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── category-filter/ # Filtro de categorías con two-way binding propio
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   └── news-card/       # Tarjeta de noticia (@Input + @Output)
│   │   ├── models/
│   │   │   ├── noticia.ts       # Interfaz Noticia y lista CATEGORIAS
│   │   │   └── site-info.ts     # Marca, datos de contacto y menú (fuente única)
│   │   ├── pages/               # Una carpeta por ruta
│   │   │   ├── contacto/
│   │   │   ├── detalle-noticia/
│   │   │   ├── favoritos/
│   │   │   ├── gestionar-noticias/
│   │   │   ├── home/
│   │   │   └── noticias/
│   │   ├── services/
│   │   │   └── noticias.service.ts
│   │   ├── utils/
│   │   │   └── texto.ts         # normalizarTexto (minúsculas y sin tildes)
│   │   ├── app.config.ts        # Router, idioma es-CO y manejo de errores
│   │   ├── app.routes.ts
│   │   ├── app.ts / app.html / app.css  # Componente raíz
│   ├── index.html
│   ├── main.ts
│   └── styles.css               # Estilos globales
├── angular.json
├── package.json
└── tsconfig.json
```

Cada componente tiene sus tres archivos: `.ts` (lógica), `.html` (plantilla) y `.css` (estilos encapsulados).

## Rutas

| Ruta                   | Componente                   | Descripción                                                                 |
| ---------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| `/`                    | `HomeComponent`              | Portada con noticia principal, destacadas y recientes                       |
| `/noticias`            | `NoticiasComponent`          | Listado con filtro por categoría y buscador (acepta `?categoria=Educación`) |
| `/detalle-noticia/:id` | `DetalleNoticiaComponent`    | Contenido completo de una noticia                                           |
| `/favoritos`           | `FavoritosComponent`         | Noticias guardadas por el usuario                                           |
| `/contacto`            | `ContactoComponent`          | Formulario de contacto con validaciones                                     |
| `/gestionar-noticias`  | `GestionarNoticiasComponent` | Crear y eliminar noticias                                                   |
| `/inicio`              | —                            | Redirige a `/`                                                              |
| `**`                   | —                            | Cualquier otra ruta redirige al inicio                                      |

## Componentes y comunicación entre ellos

```
App ──[siteInfo]/[navItems]──▶ HeaderComponent, FooterComponent        (@Input)
Home / Noticias / Favoritos ──[noticia]──▶ NewsCardComponent           (@Input)
NewsCardComponent ──(favoritoCambiado)──▶ FavoritosComponent           (@Output)
NoticiasComponent ◀──[(seleccionada)]──▶ CategoryFilterComponent       (@Input + @Output = two-way)
```

## Conceptos de Angular aplicados

| Concepto                             | Ejemplo                                                             | Dónde                                                  |
| ------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------ |
| Interpolación                        | `{{ noticia.titulo }}`                                              | Plantillas de componentes y páginas                    |
| Property binding                     | `[src]="noticia.imagen"`, `[routerLink]="..."`                      | `news-card.component.html`, `home.component.html`      |
| Event binding                        | `(click)="toggleFavorito($event)"`, `(ngSubmit)="guardarNoticia()"` | `news-card`, `gestionar-noticias`, `contacto`          |
| Two-way binding (ngModel)            | `[(ngModel)]="searchTerm"`                                          | `noticias.component.html`                              |
| Two-way binding entre componentes    | `[(seleccionada)]="categoriaSeleccionada"`                          | `noticias.component.html` + `category-filter`          |
| Class binding                        | `[class.active]="isFavorite"`, `[class]="categoriaClass"`           | `news-card`, `category-filter`, `detalle-noticia`      |
| Attribute binding                    | `[attr.aria-pressed]="isFavorite"`                                  | `news-card`, `category-filter`                         |
| `@Input` (padre → hijo)              | `@Input() noticia`, `@Input() siteInfo`                             | `news-card`, `header`, `footer`, `category-filter`     |
| `@Output` (hijo → padre)             | `@Output() favoritoCambiado`                                        | `news-card` → `favoritos`                              |
| Control flow                         | `@if`, `@for ... track`, `@empty`, `@else`                          | Todas las páginas                                      |
| Pipes                                | `{{ noticia.fecha \| date: 'longDate' }}` en español                | `news-card`, `home`, `detalle-noticia`                 |
| Formularios reactivos                | `FormBuilder`, `Validators`, mensajes de error                      | `contacto`, `gestionar-noticias`                       |
| Servicio + inyección de dependencias | `inject(NoticiasService)`                                           | Páginas y `news-card` (Contacto inyecta `FormBuilder`) |
| Routing                              | rutas con parámetros, query params y `title`                        | `app.routes.ts`, `detalle-noticia`, `noticias`         |
| Signals                              | `currentDate = signal(...)`                                         | `header.component.ts`                                  |

## Funcionalidad principal

### 1. Inicio

Muestra la portada del periódico con la noticia principal, las destacadas y las más recientes. Si no hay destacadas, usa la noticia más reciente como portada.

### 2. Noticias

Lista todas las noticias, con filtro por categoría (incluida "General") y buscador que ignora mayúsculas y tildes. Si no hay resultados, permite limpiar los filtros.

### 3. Detalle de noticia

Permite abrir una noticia específica y mostrar su contenido completo con más información.

### 4. Favoritos

Muestra las noticias marcadas como favoritas. Al quitar una, la lista se actualiza al instante gracias al `@Output` de la tarjeta.

### 5. Contacto

Incluye un formulario de contacto con validación y los datos de contacto del periódico.

### 6. Gestión de noticias

Permite agregar noticias (con mensajes de validación por campo) y eliminarlas (con confirmación).

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
npm start        # servidor de desarrollo en http://localhost:4200
npm run build    # compilación de producción en dist/
npm run watch    # compilación continua en modo desarrollo
npm run format   # formatea el código con Prettier
```

## Observaciones

- Los favoritos se guardan en el navegador con `localStorage`, por lo que se mantienen aunque recargues la página.
- La fecha del encabezado se actualiza automáticamente según la fecha actual del sistema.
- Las noticias creadas o eliminadas también se guardan en `localStorage`. Para volver a las noticias de ejemplo, borra las claves `periodico_noticias` y `periodico_favoritos` desde las herramientas del navegador (Application → Local Storage).
- Las fechas se muestran en español (locale `es-CO`, registrado en `app.config.ts`).
- El proyecto está pensado como una base sencilla, clara y apropiada para un trabajo académico de frontend.

## Autor

Proyecto desarrollado como ejercicio académico de frontend con Angular.
