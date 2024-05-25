import { Router } from '@angular/router';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
@Input() title!:string
@Input() isModal!:boolean
@Input() showMenu!:boolean
Router =inject(Router)
modalController =inject(ModalController)
utilsSrv=inject(UtilsService)

  constructor() { }

  ngOnInit() {}

  dissmissModal(){
    this.utilsSrv.dissmissModal()
  }

}
