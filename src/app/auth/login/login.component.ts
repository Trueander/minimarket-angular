import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  error: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.usuarioService
        .login(this.usuario.username, this.usuario.password)
        .subscribe(response => {
          if(response== null){
            this.error = 'Usuario y/o contraseña incorrectos'
          }else {
            this.router.navigate(['/home/productos']);
            this.usuarioService.saveUsuarioLocal(this.usuario.username);
            Swal.fire('Login exitoso','Bienvenido', 'success');
          }
        });
  }

}
