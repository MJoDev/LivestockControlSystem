import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { AdultosComponent } from './components/adultos/adultos.component';
import { BecerrosComponent } from './components/becerros/becerros.component';
import { EditarGanadoComponent } from './components/editar-ganado/editar-ganado.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegisterComponent } from './components/register/register.component';
import { SiginComponent } from './components/sigin/sigin.component';




import { AuthGuard } from './auth.guard';



const routes: Routes = [
{path: '', component: SiginComponent},
{path: 'list', component: ListComponent, canActivate: [AuthGuard]},
{path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
{path: 'editar-producto/:id', component: EditarProductoComponent, canActivate: [AuthGuard]},
{path: 'productos', component: ProductListComponent, canActivate: [AuthGuard]},
{path: 'becerros', component: BecerrosComponent, canActivate: [AuthGuard]},
{path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
{path: 'adultos', component: AdultosComponent, canActivate: [AuthGuard]},
{path: 'editar-ganado/:id', component: EditarGanadoComponent, canActivate: [AuthGuard]},
{path: 'signup', component: RegisterComponent},
{path: 'signin', component: SiginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);