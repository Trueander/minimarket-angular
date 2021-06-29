import { Injectable } from '@angular/core';
import { ItemCompra } from '../models/item-compra';

const CART_ITEMS = 'CartItems'

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: ItemCompra[] = [];

  constructor() { }

  agregarCartItems(item: ItemCompra): void{
    if(sessionStorage.getItem(CART_ITEMS)  == null){
      this.items.push(item);
      sessionStorage.setItem(CART_ITEMS, JSON.stringify(this.items));
    }else{
      this.items = JSON.parse(sessionStorage.getItem(CART_ITEMS));
      this.items.push(item)
      sessionStorage.setItem(CART_ITEMS, JSON.stringify(this.items));
    }
  }

  limpiarCarritoCompras(): void{
    sessionStorage.setItem(CART_ITEMS, JSON.stringify([]));
  }

  cantidadItems(){
    let cantidadItems;
    if(JSON.parse(sessionStorage.getItem(CART_ITEMS)) == null){
      cantidadItems = [];
    }else{
      cantidadItems = JSON.parse(sessionStorage.getItem(CART_ITEMS))
    }

    
    return cantidadItems.length;
  }
}
