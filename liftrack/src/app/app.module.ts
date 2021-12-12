import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroceriesServiceService } from './components/groceries-service.service';
import { InputDialogService } from './components/input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [GroceriesServiceService, InputDialogService,HttpClient, SocialSharing, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
