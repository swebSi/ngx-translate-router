import { importProvidersFrom } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateTitleStrategy } from './translate-title-strategy';
import { TitleStrategy } from '@angular/router';
import { provideClientHydration, BrowserModule } from '@angular/platform-browser';

import {ApplicationConfig} from '@angular/core';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({ prefix: `${environment.locales}/assets/locales/`, suffix: '.json' }),
    })),
    provideClientHydration(),
    { provide: TitleStrategy, useClass: TranslateTitleStrategy }
    //   {
    //     provide: APP_INITIALIZER,
    //     useFactory: appInitializerFactory,
    //     deps: [ Injector ],
    //     multi: true
    //   }
    ,
    provideHttpClient(withInterceptorsFromDi())
  ]
}
