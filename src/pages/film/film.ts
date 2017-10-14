import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";

/**
 * Generated class for the FilmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-film',
  templateUrl: 'film.html',
})
export class FilmPage {
  public filmId: number;
  public filmsInfo:any={};
  public videoUrl: string =AppGlobal.domain + "/upload/dy/yyzls/1.mp4"  //AppGlobal.domain + "/upload/dy/yyzls/1.mp4";

  constructor(public navCtrl: NavController, public navParams: NavParams, public  appService: AppService) {
    this.filmId = navParams.data.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmPage');
/*    this.appService.httpGet("https://api.douban.com/v2/movie/subject/"+this.filmId, {}, (data) => {
      this.filmsInfo = data;
      console.log(this.filmsInfo);
    },true)*/
  }

}
