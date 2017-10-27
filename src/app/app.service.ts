import {Injectable} from '@angular/core';
import {LoadingController, AlertController, ToastController, Toast} from 'ionic-angular';
import {NavController, App} from "ionic-angular/index";
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppGlobal {

  //接口域名
  static domain = "http://jxdj.rzzyfw.com"

  //接口地址
  static api: any = "http://jxdj1.rzzyfw.com"

  //高德web API服务key
  static gaoDeKey: any = "972cafdc2472d8f779c5274db770ac22"
}

@Injectable()
export class AppService {
  private nav: NavController;
  public toasts: Toast;

  constructor(public http: Http, private app: App, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController,) {
    this.nav = this.app.getActiveNav();
  }

  // 对参数进行编码
  encode(params) {
    var str = '';
    if (params) {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var value = params[key];
          str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      str = '?' + str.substring(0, str.length - 1);
    }
    return str;
  }

  httpGet(url, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create({});
    if (loader) {
      loading.present();
    }
    this.http.get(url + this.encode(params))
      .toPromise()
      .then(res => {
        var data = res.json();
        if (loader) {
          loading.dismiss();
        }
        callback(data);
      })
      .catch(error => {
        if (loader) {
          loading.dismiss();
        }
        this.handleError(error);
      });
  }

  httpPost(url, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create();
    if (loader) {
      loading.present();
    }
    this.http.post(url, params)
      .toPromise()
      .then(res => {
        var data = res.json();
        if (loader) {
          loading.dismiss();
        }
        callback(data);
      }).catch(error => {
      if (loader) {
        loading.dismiss();
      }
      this.handleError(error);
    });
  }

  private handleError(error: Response | any) {
    let msg = '';
    if (error.status == 0) {
      msg = '请求未初始化';
      console.log('请求未初始化');
    }
    if (error.status == 400) {
      msg = '请求无效(code：400)';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在(code：404)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (error.status == 500) {
      msg = '服务器发生错误(code：500)';
      console.error(msg + '，请检查服务器接口');
    }
    console.log(error);
    if (msg != '') {
      this.toast(msg);
    }
  }

  alert(title, message) {
    const alert = this.alertCtrl.create({
      cssClass: 'alert',
      title: title,
      message: message,
      buttons: ["确定"]
    });
    alert.present();
  }


  confirm(title, message, callback?, confirmText = '确定', cancelText = '取消', callbackCancel?) {
    const alert = this.alertCtrl.create({
      cssClass: 'confirm',
      title: title,
      message: message,
      buttons: [{
        text: cancelText,
        handler: () => {
          if (callbackCancel) {
            callbackCancel();
          }
          console.log(cancelText);
        }
      }, {
        text: confirmText,
        handler: data => {
          if (callback) {
            callback();
          }
        }
      }]
    });
    alert.present();
  }

  toast(message, callback?, position = 'top', ok = false, duration = 2000) {
    if (this.toasts) {
      this.toasts.dismiss();
    }
    this.toasts = this.toastCtrl.create({
      cssClass: 'toast',
      message: message,
      position: position,//top, bottom and middle
      duration: ok ? null : duration,
      showCloseButton: ok,
      dismissOnPageChange: false,//	Whether to dismiss the toast when navigating to a new page.
      closeButtonText: '确定'
    });
    this.toasts.present();
    if (callback) {
      callback();
    }
  }

  setItem(key: string, obj: any) {
    try {
      var json = JSON.stringify(obj);
      window.localStorage[key] = json;
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }

  getItem(key: string) {
    try {
      var json = window.localStorage[key];
      var obj = JSON.parse(json);
      return obj;
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }

  /**
   * 是否登录提示
   */
  isLogin(isShow: boolean = false) {
    if (!localStorage.getItem("userid")) {
      if (isShow) {
        this.confirm("登录", "登录体验更完善功能", () => {
          this.nav.push('LoginPage')
        }, "登录", "暂不登录", () => {
          this.nav.pop();
        })
      } else {
        this.nav.push('LoginPage')
      }
      return true;
    } else {
      return false;
    }
  }

}


