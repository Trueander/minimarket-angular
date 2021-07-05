import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { ItemCompra } from 'src/app/models/item-compra';
import { CarritoService } from 'src/app/services/carrito.service';
import { CompraService } from 'src/app/services/compra.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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


    if(this.compra.items.length > 0){
      Swal.fire({
        title: 'Compra',
        text: "¿Está seguro de realizar la compra?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.compraService.crearCompra(this.compra)
          .subscribe(response => {
            this.router.navigate(['/home/productos']);
            this.cartService.limpiarCarritoCompras();
  
            Swal.fire(
              'Compra Realizada!',
              `${this.compra.usuario.nombre}, su compra se realizó con éxito.`,
              'success'
            )
  
  
          });
  
        }
      })
  
    }else{
      Swal.fire('Espere...','Tiene que agregar al menos un producto para realizar la compra.', 'warning');
    }

    
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
