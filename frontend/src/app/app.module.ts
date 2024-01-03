import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { FiltroPipe } from './components/product-list/filtro.pipe';
import { AdultosComponent } from './components/adultos/adultos.component';
import { BecerrosComponent } from './components/becerros/becerros.component';
import { FiltroGanadoPipe } from './pipes/filtro-ganado.pipe';
import { EditarGanadoComponent } from './components/editar-ganado/editar-ganado.component';

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
    EditarGanadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    ToastrModule.forRoot({
    preventDuplicates: true,
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
