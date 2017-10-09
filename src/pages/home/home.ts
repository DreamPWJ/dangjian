import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public domain: string = "http://jxdj.rzzyfw.com"
  public videoUrl: string = "http://jxdj1.rzzyfw.com/upload/dy/yyzls/1.mp4";
  public typeFlag: number = 0;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.typeFlag=Number(localStorage.getItem("topTypeFlag"))||0;
  }

  //类型切换
  typeSwitch(type) {
    localStorage.setItem("topTypeFlag",type);
    if (type == 1) {  //智慧党建
      this.typeFlag = 1
    } else if (type == 2) { //三务公开
      this.typeFlag = 2
    } else if (type == 3) { //党员之家
      this.typeFlag = 3
    } else if (type == 4) { //精准扶贫
      this.typeFlag = 4
    } else if (type == 5) { //大美莒县
      this.typeFlag = 5
    } else if (type == 6) { //红色影院
      this.typeFlag = 6
    } else {//主页
      this.typeFlag = 0
    }
  }

  //视频切换
  liveStreaming(type) {
    if (type == 0) {  //主页
      this.typeFlag = 0;
      localStorage.setItem("topTypeFlag",'0');
      this.videoUrl = "http://jxdj1.rzzyfw.com/upload/dy/yyzls/1.mp4"
    } else if (type == 1) { //直播
      this.videoUrl = "http://u166.auto.s.wanglitiaoyi.com/live/3693838317.m3u8"
    }
  }

}
