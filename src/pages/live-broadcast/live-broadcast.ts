import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppGlobal} from "../../app/app.service";

/**
 * Generated class for the LivebroadcastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-live-broadcast',
  templateUrl: 'live-broadcast.html',
})
export class LiveBroadcastPage {
  public videoUrl: string ="http://u166.auto.s.wanglitiaoyi.com/live/3693838317.m3u8"  //AppGlobal.domain + "/upload/dy/yyzls/1.mp4";
  public liveBroadcast: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.liveBroadcast = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveBroadcastPage');
  }

}
