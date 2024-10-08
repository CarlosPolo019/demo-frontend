import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      BrowserAnimationsModule,    // Asegúrate de incluir BrowserAnimationsModule
      ToastrModule.forRoot({
        positionClass: 'toast-top-right', // Configura la posición en la parte superior derecha
        timeOut: 3000, // Duración de la notificación (3 segundos)
        closeButton: true, // Muestra un botón de cierre en la notificación
        progressBar: true // Barra de progreso
      })      // Añade ToastrModule con forRoot
    )
  ]
};
