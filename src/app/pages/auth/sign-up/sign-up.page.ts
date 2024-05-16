import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor() {}

  ngOnInit() {}

  firebase = inject(FirebaseService);
  utils = inject(UtilsService);

  async submit() {
    const loading = await this.utils.loading();
    await loading.present();
    this.firebase
      .signUp(this.form.value as User)
      .then((res) => {
        this.firebase.updateProfile(this.form.value.name);
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        this.setUserInfo(uid);
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

  async setUserInfo(uid) {
    let path = `users/${uid}`;

    delete this.form.value.password;

    this.firebase
      .setDocument(path, this.form.value)
      .then(async (res) => {
        this.utils.saveInLocalStorage('user', this.form.value);
        this.firebase.updateProfile(this.form.value.name);
        this.utils.routerLink('main/home');
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
      .finally(() => {});
  }
}
