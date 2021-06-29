import { ItemCompra } from "./item-compra";
import { Usuario } from "./usuario";

export class Compra {
    id: number;
    createAt: Date;
    usuario: Usuario;
    items: ItemCompra[] = [];

    calcularImporteFinal(): number{
        let total: number = 0;
        this.items.forEach((item: ItemCompra) => {
            let precio = item.cantidad * item.producto.precio;
            total += precio;
        });
        
        
        return total;
    }
}
