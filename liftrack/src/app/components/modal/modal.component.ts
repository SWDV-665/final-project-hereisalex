import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InputDialogService } from '../input-dialog.service';
import { ToastController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() name: string;
  @Input() type: string;

  constructor(private modalCtrl: ModalController,
              public inputDialogService: InputDialogService,
              public dataService: GroceriesServiceService,
              public toastCtrl: ToastController) { }

  ngOnInit() {}

  _dismiss() {
    console.log('dismiss');
    this.modalCtrl.dismiss({
      // "fromModal": "Subscribed Channel"
    })};

    editItem(item, index){
      console.log("Editing ", item, index)
      const toast = this.toastCtrl.create({
        message: 'Editing ' + item.name,
        duration: 2000
      }).then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
      this.inputDialogService.showPrompt(item, index);
    } 
    removeItem(item, index){
      console.log("Removed", item, index)
      const toast = this.toastCtrl.create({
        message: 'Removed ' + item.name,
        duration: 2000
      }).then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
      this.dataService.removeItem(item);
      this._dismiss();
    }
  }

