import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

=======
>>>>>>> origin/Rommel
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { TokenInterceptor } from './token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ]
};