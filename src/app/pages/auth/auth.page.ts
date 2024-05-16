import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  firebase = inject(FirebaseService);
  utils = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    const loading = await this.utils.loading();
    await loading.present();
    this.firebase
      .signIn(this.form.value as User)
      .then((res) => {
        this.utils.saveInLocalStorage('user', this.firebase.getUserData());
        this.utils.routerLink('main/home');
        loading.dismiss();
      })
      .catch((err) => {
        this.utils.showToast({
          message: err.message,
          duration: 5000,
          color: 'danger',
          icon: 'alert-circle-outline',
          position: 'middle',
        });
      })
      .finally(() => {
        loading.dismiss();
      });
  }
}
