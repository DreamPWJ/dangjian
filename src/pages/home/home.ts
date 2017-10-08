import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  videoUrl: string = "http://jxdj1.rzzyfw.com/upload/dy/yyzls/1.mp4";

  constructor(public navCtrl: NavController) {

  }

  //直播
  liveStreaming() {
    this.videoUrl = "http://u166.auto.s.wanglitiaoyi.com/live/3693838317.m3u8"
  }

  //主页
  liveHome() {
    this.videoUrl = "http://jxdj1.rzzyfw.com/upload/dy/yyzls/1.mp4"
  }
}
