import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../components/groceries-service.service';
import { InputDialogService } from '../components/input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalComponent } from '../components/modal/modal.component'
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items = [];
  errorMessage : string;

  title = "Liftrack";
  fromModal: any;

 constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController, 
              public alertCtrl: AlertController,
              public dataService: GroceriesServiceService,
              public inputDialogService: InputDialogService,
              public socialSharing : SocialSharing,
              private modalCtrl: ModalController,
              private routerOutlet: IonRouterOutlet) {
                this.loadItems();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
    
  }
  async _openModal(item, index){
    // console.log("Opening Modal");
    console.log(item);
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      mode: 'ios',
      backdropDismiss: true,
      swipeToClose: true,
      presentingElement: this.routerOutlet.parentOutlet.nativeEl,
      componentProps: {
        "item": item,
        "i": index,
      },
      cssClass:'my-modal-component-css'
    })

    modal.onDidDismiss().then((data:any)=>{
      console.log(data);
      if(data.data)
      this.fromModal=data.data.fromModal;
    })

    return await modal.present();
  }
  ionViewDidLoad(){
    console.log("First load");
    this.loadItems();
  }


   loadItems () {
    return this.dataService.getItems().subscribe(
                          items => this.items = items,
                          error => this.errorMessage = <any>error);
  }


  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
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
  }

 shareItem(item, index){
  console.log("Sharing item - ", item, index)
  const toast = this.toastCtrl.create({
    message: 'Sharing Item - ' + index + " ...",
    duration: 2000
  }).then((toastData) => {
    console.log(toastData);
    toastData.present();
  });
   let message = "Grocery item - Name : " + item.name + " Quantity: " + item.quantity;
  let subject = "Shared from Groceries App";
  this.socialSharing.share(message, subject).then(() => {
    console.log("Share successful");
  }).catch((error) => {
    console.error("Error while sharing", error);
  });
}



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
}
