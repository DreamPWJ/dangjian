import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppService} from "../../app/app.service";

/**
 * Generated class for the NewsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {
  public newsDetailInfo:any={};
  public backgroundImage = 'assets/img/main/0.jpg';
  constructor(public navCtrl: NavController, public navParams: NavParams,public  appService: AppService) {
    this.newsDetailInfo = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailsPage');
  }

}
