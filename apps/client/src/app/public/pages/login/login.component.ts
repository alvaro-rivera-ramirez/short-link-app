import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{
  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )

  formLogin: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  get email() {
    return this.formLogin.get('email');
  }
  get password() {
    return this.formLogin.get('password');
  }

  login() {
    const { email, password } = this.formLogin.value;
    console.log({ email, password });
    this.authService.login(email, password).subscribe({
      next: (value) =>{
        Swal.fire({
          title: 'Bienvenido!',
          icon: 'success',
          showConfirmButton: false,
          timer: 500,
        }).then(()=>
        this.router.navigateByUrl('/dashboard')
        );
      }
      ,
      error: (err) => {
        Swal.fire({
          title: 'Usuario y/o contraseña incorrectas!',
          icon: 'error',
          showConfirmButton: false,
          timer: 500,
        });
        this.formLogin.reset();
      },
    });
  }
}
