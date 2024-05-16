import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utils = inject(UtilsService);
  constructor() { }

  ngOnInit() {
  }

  getUser(){
    return this.utils.getFromLocalStorage('user');
  }

  submit(){
    this.utils.routerLink('main/profile');
  }

}
