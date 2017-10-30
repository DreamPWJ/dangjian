import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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
  public videoUrl: string = ""  //AppGlobal.domain + "/upload/dy/yyzls/1.mp4";
  public liveBroadcast: any = {};
  public videoType: number = 0;
  public backgroundImage = 'assets/img/main/0.jpg';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.liveBroadcast = navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveBroadcastPage');
  }

  ionViewDidEnter() {
    this.switchVideo(1);
  }

  /**
   * 切换视频
   * @param {number} type
   */
  switchVideo(type: number) {
    this.videoType = type;
    if (type == 1) {
      this.videoUrl = this.liveBroadcast.outerUrl
    }
    if (type == 2) {
      this.videoUrl = this.liveBroadcast.innerUrl
    }
  }
}
