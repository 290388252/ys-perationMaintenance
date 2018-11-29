import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppProperties} from '../../app.properties';
import {AppService} from '../../app-service';
import {urlParse} from '../../utils/util';
declare var wx: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './vmLogin.component.html',
  styleUrls: ['./vmLogin.component.css']
})
export class VmLoginComponent implements OnInit {
  validateForm: FormGroup;
  public validateValue = true;
  public phone: number;
  public buttonNoTouch = false;
  public truePhone = true;
  public times = 60;
  public payType: number;
  constructor(private fb: FormBuilder,
              private router: Router,
              private appProperties: AppProperties,
              private appService: AppService) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      phoneForm: [ null, [ Validators.required  ] ],
      password: [ null, [ Validators.required ] ]
    });
    this.IsWeixinOrAlipay();
    console.log(this.payType);
  }
  // 表单提交
  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (true) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
    if (this.validateForm.controls.phoneForm.value !== null && this.validateForm.controls.password.value !== null) {
      this.appService.getData(this.appProperties.adminLoginUrl,
        {
          phone: this.validateForm.controls.phoneForm.value,
          phoneCode: this.validateForm.controls.password.value,
          wxOrAli: this.payType,
          vmCode: urlParse(window.location.search)['vmCode'],
          openId: urlParse(window.location.search)['openId']
        }).subscribe(
        data => {
          if (data.status !== 1) {
            alert(data.message);
          } else if (data.status === 1301 || data.status === 1401 || data.status === 1) {
            console.log(data);
            const exp = new Date();
            exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30);
            document.cookie = 'adminToken=' + data.data + ';expired=' + exp.toUTCString();
            if (data.msg !== 'success') {
              alert(data.msg);
            }
            this.router.navigate(['addMain'], {
              queryParams: {
                vmCode: urlParse(window.location.search)['vmCode'],
                payType: this.payType,
                token: data.data
              }});
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      alert('请输入账号密码');
    }
  }
  // 手机端打开小键盘获取焦点是改变背景高度px
  focusCode() {
    document.getElementById('containers').style.height = (document.documentElement.offsetWidth + 80) + 'px';
  }
  // 发送验证码
  sendCode(e: TouchEvent) {
    e.preventDefault();
    if (/^1[0123456789]\d{9}$/.test(this.phone.toString())) {
      this.appService.postData(this.appProperties.smsSendUrl, {phone: this.phone}).subscribe(
        data => {
          console.log(data);
          if (data.code !== 0) {
            alert('发送失败');
          } else {
            this.times = 60;
            this.buttonNoTouch = true;
            this.truePhone = true;
            const timer = setInterval(() => {
              this.times --;
              if (this.times <= 0) {
                this.buttonNoTouch = false;
                clearInterval(timer);
              }
            }, 1000);
            setTimeout(() => {
              this.buttonNoTouch = false;
            }, 60100);
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.truePhone = false;
    }
  }
  // 检测是微信还是支付宝登陆
  IsWeixinOrAlipay() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
      if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
         this.payType = 1;
      }
    } else {
      this.payType = 2;
    }
  }
}
