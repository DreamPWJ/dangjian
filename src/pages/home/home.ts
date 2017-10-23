import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";
import {Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public domain: string = AppGlobal.domain
  public videoUrl: string = this.domain + "/upload/dy/yyzls/1.mp4";
  public typeFlag: number = 1;
  public redFilms: any[];
  public countryName:string="莒县"

  constructor(public navCtrl: NavController, public appService: AppService, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.typeFlag = Number(localStorage.getItem("topTypeFlag")) || 1;
    if (this.typeFlag == 6) { //红色影院
      this.getFilms();
    }
    /**
     * 地理定位
     */
    this.geolocation.getCurrentPosition().then((resp) => {
      this.appService.setItem("latitude", resp.coords.latitude);
      this.appService.setItem("longitude", resp.coords.longitude);
      //获取当前位置 省市县数据
      this.appService.httpGet("https://restapi.amap.com/v3/geocode/regeo", {
        key: AppGlobal.gaoDeKey,
        location: Number(resp.coords.longitude).toFixed(6) + "," + Number(resp.coords.latitude).toFixed(6),
        radius: 100,//	查询POI的半径范围。取值范围：0~3000,单位：米
        extensions: 'base',//返回结果控制
        batch: false, //batch=true为批量查询。batch=false为单点查询
        roadlevel: 0, //可选值：1，当roadlevel=1时，过滤非主干道路，仅输出主干道路数据
        isHideLoad: true
      }, (data) => {
        console.log(data);
        if (data.infocode == 10000) {
          this.countryName = data.regeocode.addressComponent.township.replace(/镇/g,'');
        }

      }, )
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  ionViewDidEnter() {
    if (this.typeFlag == 1) {//智慧党建
      this.playPause(0);
    }
  }

  ionViewWillLeave() {
    if (this.typeFlag == 1) {//智慧党建
      this.playPause(1);
    }

  }

  /**
   * 类型切换
   * @param type
   */
  typeSwitch(type) {
    localStorage.setItem("topTypeFlag", type);
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
      this.getFilms();
    }
  }

  /**
   * 导航视频监控选择页面
   */
  pushVillageChoicePage(type: number, title: string) {
    this.navCtrl.push('VillageChoicePage', {
      type: type,
      title: title
    });
  }

  /**
   * 导航视频监控页面
   */
  pushLiveBroadcastPage(type: number, title: string) {
    this.navCtrl.push('LiveBroadcastPage', {
      type: type,
      title: title
    });
  }

  /**
   * 导航新闻页面
   */
  pushNewsPage(id: number, title: string) {
    this.navCtrl.push('NewsPage', {
      id: id,
      title: title
    });
  }

  /**
   * 导航外部网址页面
   */
  windowOpen(url: string) {
    window.open(url, '_self ')
  }

  /**
   * 获取电影数据
   */
  getFilms() {
    this.appService.httpGet("https://api.douban.com/v2/movie/search", {tag: "抗战", count: 13}, (data) => {
      console.log(data);
      this.redFilms = data.subjects;
    }, true)
  }


  /**
   * 搜索电影
   * @param ev
   */
  searchFilm(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    /*    let val = ev.target.value;*/
    // if the value is an empty string don't filter the items
    /*    if (val && val.trim() != '') {
          this.redFilms = this.redFilms.filter((item) => {
            return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }*/
  }

  /**
   * 导航电影页面
   * @param id
   */
  pushFilmPage(id: number, event: Event) {
    /*    event.stopPropagation();*/
    this.navCtrl.push('FilmPage', {
      id: id,
    });
  }

  /**
   * 控制视频播放和暂停
   * @param type
   */
  playPause(type) {
    /* let myVideo = document.querySelector('#home-video');*/
    let myVideo = document.getElementsByTagName('video')[0];
    if (type == 0) {
      myVideo.play();
    }
    else if (type == 1) {
      myVideo.pause();
    }
  }
}
