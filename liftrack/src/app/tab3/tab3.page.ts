import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../components/groceries-service.service';
import { InputDialogService } from '../components/input-dialog.service';
// import { OpenItemService } from '../open-item.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalComponent } from '../components/modal/modal.component'
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})



export class Tab3Page {
  public weights = [];
  errorMessage : string;
  //variables such a title and profile
  title = "Liftrack";

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

  ionViewDidLoad(){
    console.log("First load");
    this.loadItems();
  }

  loadItems () {
    console.log(this.weights);
    return this.dataService.getWeights().subscribe(
      weights => this.weights = weights,
      error => this.errorMessage = <any>error);
  }

  addWeight() {
    this.inputDialogService.showPromptWeight();
  }

  removeWeight(weight, index) {
    this.dataService.removeWeight(weight);
  }

}

