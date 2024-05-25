import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {
  LoadingController,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingController = inject(LoadingController);
  toastController = inject(ToastController);
  modalController = inject(ModalController);
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

  //Manejo de modales
  async presentModal(opt: ModalOptions) {
    const modal = await this.modalController.create(opt);
    await modal.present();
  }

  async dissmissModal(data?: any) {
    return this.modalController.dismiss(data);
  }

  //Manejo de la camara
  async takePicture(promptLabelHeader:string) {
    return await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto:"Selecciona una imagen",
      promptLabelPicture:"Toma una foto"
    });
  }


  constructor() {}
}
