import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading: boolean = false;
  products: Product[] = [];
  utils = inject(UtilsService);
  firebaseSrv = inject(FirebaseService);

  constructor() {}

  ngOnInit() {}

  getUser() {
    return this.utils.getFromLocalStorage('user');
  }

  submit() {
    this.utils.routerLink('main/profile');
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  addUpdateProduct(product?: Product) {
    this.utils.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: {product},
    });
  }
}
