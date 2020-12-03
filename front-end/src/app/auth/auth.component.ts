import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Globals } from '../globals/globals';

export class AuthResponse{
  token : string;
  usuario : Usuario;
  success: boolean;
}

export class Usuario{
  idUsuario : number
  nome : string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private nome : string;
  private senha: string;
  private authInvalido: boolean;

  constructor(private authServices: AuthService, private router: Router, private globals: Globals) { }

  ngOnInit(): void {
  }

  auth(){
    this.authServices.auth(this.nome, this.senha).subscribe(response => {
      if (response.success == true){
        this.globals.loginData.token = response.token;
        this.globals.loginData.usuario = response.usuario;
        this.authInvalido = false;
        this.router.navigate(['/home']);
      }else{
        this.authInvalido = true;
      }
    
    }, err => {
      this.authInvalido = true;
    });
  }

}
