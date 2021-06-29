import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css', '../../header/header.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  productosPorCategoria: Producto[] = [];
  categorias: Categoria[] = [];
  search: string = '';

  constructor(private productoService: ProductoService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos()
        .subscribe(response => {
          this.productos = response;
        });
    this.productoService.obtenerCategorias()
        .subscribe(response => {
          this.categorias = response;
        });

  }

  buscarProductoByNombre(): void {
    this.productoService.obtenerProductosByNombre(this.search)
        .subscribe(response => {
          console.log(response);
          this.productos =[];
          this.productos = response;
        })
  }

  cargarProductos(): void {
    this.productos = [];
    this.productoService.obtenerProductos().subscribe(response => this.productos = response);
  }

  productosCategoria(id: number): void {
    this.productos = [];
    this.productoService.getProductosPorCategoria(id)
        .subscribe(response => {
          this.productos = response;
        });
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['']);
  }

}
