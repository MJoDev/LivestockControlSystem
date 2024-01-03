import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { AdultosComponent } from './components/adultos/adultos.component';
import { BecerrosComponent } from './components/becerros/becerros.component';
import { EditarGanadoComponent } from './components/editar-ganado/editar-ganado.component';






const routes: Routes = [
{path: '', component: ListComponent},
{path: 'list', component: ListComponent},
{path: 'create', component: CreateComponent},
{path: 'editar-producto/:id', component: EditarProductoComponent},
{path: 'productos', component: ProductListComponent},
{path: 'becerros', component: BecerrosComponent},
{path: 'adultos', component: AdultosComponent},
{path: 'editar-ganado/:id', component: EditarGanadoComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
