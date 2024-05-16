import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingController = inject(LoadingController);
  toastController = inject(ToastController);
  router = inject(Router);

  loading() {
    return this.loadingController.create({
      message: 'Loading...',
    });
  }

  async showToast(op?: ToastOptions) {
    const toast = await this.toastController.create(op);
    toast.present();
  }

  routerLink(url: string) {
    this.router.navigateByUrl(url);
  }

  //Almacenamiento local
  saveInLocalStorage(key: string, value: any) {
   return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  constructor() {}
}
