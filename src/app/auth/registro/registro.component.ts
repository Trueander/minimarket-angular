import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css', '../login/login.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  error: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario(): void {
    this.usuarioService.registrarUsuario(this.usuario)
        .subscribe(response => {
          this.router.navigate(['']);
          alert('Usuario creado con éxito!');
        });
  }

}
