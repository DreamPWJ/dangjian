import {LoadingController, AlertController, ToastController, Toast} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppGlobal {
  //缓存key的配置
  static cache: any = {}
  //接口域名
  static domain = "http://jxdj.rzzyfw.com"

  //接口地址
  static api: any = "http://jxdj1.rzzyfw.com"
}

@Injectable()
export class AppService {
  public toasts: Toast;

  constructor(public http: Http, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController,) {
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
        var d = res.json();
        if (loader) {
          loading.dismiss();
        }
        callback(d == null ? "[]" : d);
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
        var d = res.json();
        if (loader) {
          loading.dismiss();
        }
        callback(d == null ? "[]" : d);
      }).catch(error => {
      if (loader) {
        loading.dismiss();
      }
      this.handleError(error);
    });
  }

  private handleError(error: Response | any) {
    let msg = '';
    if (error.status == 400) {
      msg = '请求无效(code：404)';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在(code：404)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (error.status == 500) {
      msg = '服务器发生错误(code：500)';
      console.error(msg + '，请检查路径是否正确');
    }
    console.log(error);
    if (msg != '') {
      this.toast(msg);
    }
  }

  alert(message, callback?) {
    if (callback) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: [{
          text: "确定",
          handler: data => {
            callback();
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: ["确定"]
      });
      alert.present();
    }
  }

  toast(message, callback?, position = 'top', ok = false, duration = 2000) {
    if (this.toasts) {
      this.toasts.dismiss();
    }
    this.toasts = this.toastCtrl.create({
      cssClass: '',
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

  getItem(key: string, callback) {
    try {
      var json = window.localStorage[key];
      var obj = JSON.parse(json);
      callback(obj);
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }
}
