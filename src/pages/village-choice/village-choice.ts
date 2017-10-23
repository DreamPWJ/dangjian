import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the VillageChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-village-choice',
  templateUrl: 'village-choice.html',
})
export class VillageChoicePage {
  public videoType: any = {};
  public villageType: number = -1;
  public backgroundImage = 'assets/img/main/1.jpg';
  public villageData: any = [{
    name: "徐家村",
    outerUrl: "http://u166.auto.s.wanglitiaoyi.com/live/2289975713.m3u8",
    innerUrl: "http://u166.auto.s.wanglitiaoyi.com/live/3079219066.m3u8",
  }, {
    name: "牛庄一村",
    outerUrl: "http://u166.auto.s.wanglitiaoyi.com/live/3874418714.m3u8",
    innerUrl: "http://u166.auto.s.wanglitiaoyi.com/live/2252798786.m3u8",
  }, {
    name: "沭水社区", outerUrl: "", innerUrl: "http://u166.auto.s.wanglitiaoyi.com/live/3433230830.m3u8",
  }, {
    name: "岳家庄村", outerUrl: "", innerUrl: "",
  }, {
    name: "古佛寺村", outerUrl: "", innerUrl: "",
  }, {
    name: "刘家河口村", outerUrl: "", innerUrl: "",
  }, {
    name: "孙家庄村", outerUrl: "", innerUrl: "",
  }, {
    name: "大寺村", outerUrl: "", innerUrl: "",
  }, {
    name: "西北场村", outerUrl: "", innerUrl: "",
  }, {
    name: "西湖村", outerUrl: "", innerUrl: "",
  }, {
    name: "厉家庄村", outerUrl: "", innerUrl: "",
  }]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.videoType = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VillageChoicePage');
  }

  /**
   * 导航视频监控页面
   */
  pushLiveBroadcastPage(index: number, name: string, outerUrl: string, innerUrl: string) {
    this.navCtrl.push('LiveBroadcastPage', {
      type: this.videoType.type,
      name: name,
      outerUrl: outerUrl,
      innerUrl: innerUrl
    });
  }

  /**
   * 获取到焦点
   * @param {number} index
   */
  villageFocus(index: number) {
    this.villageType = index;
  }
}
