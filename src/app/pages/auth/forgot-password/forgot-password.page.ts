import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  firebase=inject(FirebaseService)
  utils=inject(UtilsService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor() { }

  ngOnInit() {
  }

  enviarCorreo(){
    this.firebase.forgotPassword(this.form.value.email);
    this.utils.showToast({
      message: "Se ha enviado un correo para restablecer la contraseña",
      duration: 4000,
      color: 'primary',
      icon: 'alert-circle-outline',
      position: 'middle',
    });
    this.utils.routerLink('/auth');
  }
}
