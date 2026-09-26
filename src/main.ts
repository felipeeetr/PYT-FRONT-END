import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Este archivo inicia la aplicación Angular y la monta en el navegador.
// Aquí se le indica qué componente principal debe cargarse y qué configuración usar.
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
