import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './menu/productos/productos.component';
import { ProductoDetalleComponent } from './menu/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './menu/carrito/carrito.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },
  { path: 'home', component: MenuComponent, children: [
    { path: 'productos', component: ProductosComponent },
    { path: 'productos/:id', component: ProductoDetalleComponent },
    { path: 'cart', component: CarritoComponent }
  ]}

]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    ProductosComponent,
    ProductoDetalleComponent,
    CarritoComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
