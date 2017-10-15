import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public apiUrl: string = AppGlobal.api;
  public newsInfo: any = {};
  public newsList: any[];
  public isNotData: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public  appService: AppService) {
    this.newsInfo = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');

  }

  ionViewDidEnter() {
    this.getNews(this.newsInfo.id);
  }
  /**
   * 获取新闻数据
   */
  getNews(id) {
    this.appService.httpGet(AppGlobal.api + "/json/jlist1.aspx", {id: id, page: 1}, (data) => {
      console.log(data);
      this.isNotData = false;
      if (data == null || data.length == 0) {
        this.isNotData = true;
        return
      }
      this.newsList = data;
    }, true)
  }
}
