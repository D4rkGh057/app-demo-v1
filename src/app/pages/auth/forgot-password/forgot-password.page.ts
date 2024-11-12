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


  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  })

  firebase = inject(FirebaseService)
  utils = inject(UtilsService)

  async submit()
  {
    const loading = await this.utils.loading()
    await loading.present()

    this.firebase.resetPassword(this.form.value.email).then(res => {
      console.log(res)
      this.utils.saveInLocalStorage('user',this.form.value)
      this.utils.routerLink('auth')
    }).catch(err => {
      this.utils.showToast({
        message:err.message,
        color:'danger',
        position:'middle',
        duration:10000,
        icon:'alert-circle-outline'
      })
    }).finally(() => {
      loading.dismiss()
    })
  }

  ngOnInit() {
  }

}
