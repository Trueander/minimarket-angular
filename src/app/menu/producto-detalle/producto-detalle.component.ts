import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCompra } from 'src/app/models/item-compra';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css', '../../header/header.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  producto: Producto = new Producto();
  itemCompra: ItemCompra = new ItemCompra();

  constructor(private activatedRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private productoService: ProductoService,
              private cartService: CarritoService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.activatedRoute.params
        .subscribe(params => {
          let id = params['id'];
          if(id){
            this.productoService.buscarProducto(id)
                .subscribe(response => this.producto = response);
          }
        });
        this.itemCompra.cantidad = 1;
  }

  addItem(producto: Producto): void {


    this.itemCompra.producto = producto;
    this.cartService.agregarCartItems(this.itemCompra);
    this.router.navigate(['/home/cart']);
      
  }

  aumentarCantidad(): void{
    this.itemCompra.cantidad++;
    console.log(this.itemCompra)
  }

  bajarCantidad(): void{
    
    if(this.itemCompra.cantidad < 2){
      return
    }else{
      this.itemCompra.cantidad--;
    }
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['']);
  }

}
