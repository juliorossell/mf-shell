import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment.prod';

// Import shared JWT interceptor
import { provideJwtInterceptor } from '../../../shared/interceptors';

// Import CoreLayout service and initializer
import { CoreLayoutService, coreLayoutInitializerProvider } from '../../../shared/core/core-layout';

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
