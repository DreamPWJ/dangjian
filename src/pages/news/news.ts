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
  public backgroundImage = 'assets/img/main/0.jpg';
  public currentTime: any = new Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public  appService: AppService) {
    this.newsInfo = navParams.data;
  }

  ionViewDidLoad() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 30000)
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

  /**
   * 导航新闻详情页面
   * @param id
   */
  pushNewsDetailsPage(title: string, content: string) {
    this.navCtrl.push('NewsDetailsPage', {
      title: title,
      content: content
    });
  }


}
