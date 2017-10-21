import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppService} from "../../app/app.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public account: any = {user: "", password: ""}
  public backgroundImage = 'assets/img/login/background.jpg';

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
/*    this.appService.isLogin(true);*/
    /*   this.appService.confirm("登录",JSON.stringify(this.account),function () {

       })*/
    /*    this.appService.toast(JSON.stringify(this.account),function () {

        })*/
  }
}
