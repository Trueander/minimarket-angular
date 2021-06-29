import { Categoria } from "./categoria";

export class Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    categoria: Categoria;
}
