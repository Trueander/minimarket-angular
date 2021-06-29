import { Compra } from "./compra";

export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    username: string;
    password: string;
    compras: Compra[];
}
