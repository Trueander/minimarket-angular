import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { ItemCompra } from 'src/app/models/item-compra';
import { CarritoService } from 'src/app/services/carrito.service';
import { CompraService } from 'src/app/services/compra.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css', '../../header/header.component.css']
})
export class CarritoComponent implements OnInit {

  compra: Compra = new Compra();
  cart: ItemCompra[] = [];

  constructor(private usuarioService: UsuarioService, private compraService: CompraService, private router: Router, private cartService: CarritoService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('CartItems')){
      this.usuarioService.getUsuarioByUsername(this.usuarioService.getUsuarioLocal())
          .subscribe(response => {
            this.compra.usuario = response;
          });
      this.cart = JSON.parse(sessionStorage.getItem('CartItems'))
      console.log(this.cart)
        this.cart.forEach(item => {
          if(this.existeItem(item.producto.id)){
            this.incrementarCantidad(item.producto.id);
          }else{
            this.compra.items.push(item);
          }
        });

  }
  }

  realizarCompra(): void {
    this.compraService.crearCompra(this.compra)
        .subscribe(response => {
          console.log('COMPRA REALIZADA', response);
          this.router.navigate(['/home/productos']);
          this.cartService.limpiarCarritoCompras();
          alert(`${this.compra.usuario.nombre}, su compra se realizó con éxito!`);
        });
  }

  existeItem(id: number): boolean{
    let existe = false;
    this.compra.items.forEach((item: ItemCompra) => {
      if(id === item.producto.id) existe = true;
    });
    return existe;
  }

  incrementarCantidad(id: number): void{
    this.compra.items = this.compra.items.map((item: ItemCompra) => {
      if(id === item.producto.id){
        ++item.cantidad;
        
      }
      return item;
    });
  }

  aumentarCantidad(item: ItemCompra): void{
    item.cantidad++;
    sessionStorage.setItem('CartItems', JSON.stringify(this.compra.items));
  }

  bajarCantidad(item: ItemCompra): void{
    
    if(item.cantidad < 2){
      return
    }else{
      item.cantidad--;
      sessionStorage.setItem('CartItems', JSON.stringify(this.compra.items));
    }
  }

  
  eliminarCartItem(item: ItemCompra): void{
    this.compra.items = this.compra.items.filter((itemP: ItemCompra) => item.producto.id !== itemP.producto.id);
    sessionStorage.setItem('CartItems', JSON.stringify(this.compra.items));
}

logout(): void {
  this.usuarioService.logout();
  this.router.navigate(['']);
}

}
