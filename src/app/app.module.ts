import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './component-login/login/login.component';
import { UserComponent } from './component-user/user/user.component';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { NavegarComponent } from './navegacion/navegar/navegar.component';
import { PeliculasformComponent } from './component-formPelis/peliculasform/peliculasform.component';
import { FormPelisComponent } from './component-formCorreo/form-pelis/form-pelis.component';
import { RutaErrorComponent } from './component-rutaError/ruta-error/ruta-error.component';
import { ErrorHandlerService } from './services/error-handler.service';
import { AppInsightsService } from './services/app-insights.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    NavegarComponent,
    PeliculasformComponent,
    FormPelisComponent,
    RutaErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true,
    },
    AppInsightsService,
    {
      provide:ErrorHandler,
      useClass:ErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
