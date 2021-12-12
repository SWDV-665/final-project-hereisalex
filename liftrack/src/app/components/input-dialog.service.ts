import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceService) { }


/***
   * This function shows the alert pop up to allow user to add or edit item name and quantity
   * and finally saves the item into the list
   */
 showPrompt(item?, index?) {
  const prompt = this.alertCtrl.create({
    cssClass: 'input-dialog',
    mode: 'ios',
    header: item ? 'Edit Exercise' : 'Add Exercise',
    inputs: [
      {
        name: 'name',
        placeholder: 'Exercise Name',
        value: item ? item.name : null
      },
      {
        name: 'weight',
        //This is going to show the quantity dial where user can increase 
        //or decrease quantity using up and down arrows
        type: 'number',
        min: 1,
        max:10,
        placeholder: 'Weight',
        value: item ? item.weight : null
      },
      {
        name: 'reps',
        //This is going to show the quantity dial where user can increase 
        //or decrease quantity using up and down arrows
        type: 'number',
        min: 1,
        max:100,
        placeholder: 'Reps',
        value: item ? item.reps : null
      },
      {
        name: 'sets',
        //This is going to show the quantity dial where user can increase 
        //or decrease quantity using up and down arrows
        type: 'number',
        min: 1,
        max:100,
        placeholder: 'Sets',
        value: item ? item.sets : null
      },
      {
        name: 'notes',
        placeholder: 'Notes',
        value: item ? item.notes : null
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
          console.log(item);
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log('Saved clicked', data);
          data.date = new Date().toDateString();
          if (index !== undefined) {
            item.name = data.name;
            item.weight = data.weight;
            item.reps = data.reps;
            item.sets = data.sets;
            item.notes = data.notes;
            item.date = data.date;
            this.dataService.editItem(item, index);
          } else {
            this.dataService.addItem(data);
            console.log(data);
          }
        }
      }
    ]
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }    // end of showPrompt
  
  // weight prompt

  showPromptWeight(weight?, index?) {
    const prompt = this.alertCtrl.create({
      cssClass: 'input-dialog',
      header: 'Record Body Weight',
      mode: 'ios',
      inputs: [
        {
          name: 'weight',
          //This is going to show the quantity dial where user can increase 
          //or decrease quantity using up and down arrows
          type: 'number',
          min: 1,
          max:1000,
          placeholder: 'Weight',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
            console.log(weight);
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked', data);
            data.date = new Date().toDateString();
              this.dataService.addWeight(data);
              console.log(data);
            }
          }
        
      ]
      }).then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
    }    // end of showPrompt
}
