
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment.prod';
import { provideJwtInterceptor } from '../../shared/interceptors';
import { CoreLayoutService } from '../../shared/core/core-layout/core-layout.service';
import { coreLayoutInitializerProvider } from '../../shared/core/core-layout/core-layout.initializer';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    // JWT Interceptor compartido para Shell y todos los microfrontends
    ...provideJwtInterceptor(),
    // Environment injection
    { provide: 'environment', useValue: environment },
    // CoreLayout service initialization
    CoreLayoutService,
    coreLayoutInitializerProvider
  ]
};
