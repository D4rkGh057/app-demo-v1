import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  utils = inject(UtilsService);
  firebase = inject(FirebaseService);
  constructor() {}

  ngOnInit() {}
  //obtener datos de usuario
  getUser() {
    return this.utils.getFromLocalStorage('user');
  }

  //actualizar perfil
  updateProfileName() {
    this.firebase
      .updateProfile(this.form.value.name)
      .then(() => {
        // Actualización exitosa
        this.utils.saveInLocalStorage('user', {
          ...this.getUser(),
          name: this.form.value.name,
        });
        this.firebase.setDocument(
          `users/${this.utils.getFromLocalStorage('user').uid}`,
          {
            name: this.form.value.name,
            email: this.getUser().email,
            uid: this.getUser().uid,
          }
        );
      })
      .catch((error) => {
        // Manejo de errores
        console.error(error);
      });
  }

  updateProfilePassword() {
    this.firebase.forgotPassword(this.getUser().email);
    this.utils.showToast({
      message: 'Se ha enviado un correo para restablecer la contraseña',
      duration: 4000,
      color: 'primary',
      icon: 'alert-circle-outline',
      position: 'middle',
    });
  }
}
