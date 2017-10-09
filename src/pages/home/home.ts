import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  videoUrl: string = "http://jxdj1.rzzyfw.com/upload/dy/yyzls/1.mp4";
  typeFlag: number = 0;

  constructor(public navCtrl: NavController) {

  }

  //类型切换
  typeSwitch(type) {
    if (type == 1) {  //智慧党建
      this.typeFlag = 1
    } else if (type == 2) { //三务公开
      this.typeFlag = 2
    } else {//主页
      this.typeFlag = 0
    }
  }

  //视频切换
  liveStreaming(type) {
    if (type == 0) {  //主页
      this.typeFlag = 0
      this.videoUrl = "http://jxdj1.rzzyfw.com/upload/dy/yyzls/1.mp4"
    } else if (type == 1) { //直播
      this.videoUrl = "http://u166.auto.s.wanglitiaoyi.com/live/3693838317.m3u8"
    }
  }

}
