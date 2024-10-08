// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config'; // Asegúrate de que esta ruta sea correcta

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

// Combina la configuración del cliente y del servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);
