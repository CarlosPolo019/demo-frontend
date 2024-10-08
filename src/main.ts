// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // Cambia esto si tienes otro componente principal

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
