import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule, routing, appRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './auth.guard';

import { ToastrModule } from 'ngx-toastr';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { FiltroPipe } from './components/product-list/filtro.pipe';
import { AdultosComponent } from './components/adultos/adultos.component';
import { BecerrosComponent } from './components/becerros/becerros.component';
import { FiltroGanadoPipe } from './pipes/filtro-ganado.pipe';
import { EditarGanadoComponent } from './components/editar-ganado/editar-ganado.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegisterComponent } from './components/register/register.component';
import { SiginComponent } from './components/sigin/sigin.component';
import { ReportesComponent } from './components/reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListComponent,
    ProductListComponent,
    EditarProductoComponent,
    FiltroPipe,
    AdultosComponent,
    BecerrosComponent,
    FiltroGanadoPipe,
    EditarGanadoComponent,
    InicioComponent,
    RegisterComponent,
    SiginComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    routing,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ToastrModule.forRoot({
    preventDuplicates: true,
    }),
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
