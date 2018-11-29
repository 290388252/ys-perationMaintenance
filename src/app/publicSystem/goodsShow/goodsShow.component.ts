import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {urlParse} from '../../utils/util';
declare var WeixinJSBridge: any;
declare var wx: any;

@Component({
  selector: 'app-detail',
  templateUrl: './goodsShow.component.html',
  styleUrls: ['./goodsShow.component.css']
})
export class GoodsShowComponent implements OnInit {
  public more: boolean;
  public single: boolean;
  public close: boolean;
  public isVisibleOpen: boolean;
  public isVisibleFixed: boolean;
  public isVisibleWarn: boolean;
  public token: string;
  public wayNum: string;
  public basicItemId: string;
  public index: string;
  public num: number;
  public goodsList = [];
  public count = 0;
  private timeInterval;
  public flag;
  public img = this.appProperties.imgUrl;
  public replenishList = [];
  public aliPay = false;
  public price: string;
  public couponList;
  public waterVoucherList = [];

  constructor(private router: Router,
              private appProperties: AppProperties,
              private appService: AppService) {
  }
  ngOnInit() {
    this.couponList = [];
    this.waterVoucherList = [];
    this.flag = sessionStorage.getItem('flag');
    // this.flag = urlParse(window.location.search)['flag'];
    this.getToken();
    this.goodsList = [];
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/AlipayClient/i)) {
      if (ua.match(/AlipayClient/i)[0] === 'alipayclient') {
        this.aliPay = true;
      }
    } else {
      this.aliPay = false;
    }
    this.isVisibleOpen = false;
    this.isVisibleFixed = false;
    console.log(this.token);
    console.log(this.flag);
    this.oneGoodsOrMore();
  }
  turnText(item) {
    let text;
      if (item.changeNum < 0) {
        text = item.changeNewNum === undefined ? `拿取数量${-item.changeNum}` : `拿取数量${-item.changeNum},修正后数量${item.changeNewNum}`;
      } else if (item.changeNum > 0 && (this.flag === '3' || this.flag === '4')) {
        text = item.changeNewNum === undefined ? `补货数量${item.changeNum}` : `补货数量${item.changeNum},修正后数量${item.changeNewNum}`;
      }
    return text;
  }
  fixedNum(item, index) {
    this.isVisibleFixed = true;
    this.wayNum = item.wayNum;
    this.basicItemId = item.basicItemId;
    this.index = index;
  }
  yes() {
    this.isVisibleWarn = false;
  }
  fixedYes() {
    this.appService.getAliData(this.appProperties.machineControlAdjustReplenish +
      `vmCode=${urlParse(window.location.search)['vmCode']}&wayNum=${this.wayNum}&basicItemId=${this.basicItemId}&adjustNum=${this.num}`,
      '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.replenishList[this.index].changeNewNum = this.num;
          alert('修改成功');
        } else {
          alert(data.message);
        }
        this.isVisibleFixed = false;
      },
      error2 => {
        console.log(error2);
      }
    );
  }
  exit() {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i)) {
        if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
          if (this.flag === 3 || this.flag === '3'
            || this.flag === 4 || this.flag === '4') {
            this.router.navigate(['addMain'], {
              queryParams: {
                vmCode: urlParse(window.location.search)['vmCode'],
                token: sessionStorage.getItem('token'),
                payType: 1
              }});
          } else {
            WeixinJSBridge.call('closeWindow');
          }
        }
      } else if (ua.match(/AlipayClient/i)) {
        if (ua.match(/AlipayClient/i)[0] === 'alipayclient') {
          if (this.flag === 3 || this.flag === '3'
            || this.flag === 4 || this.flag === '4') {
            this.router.navigate(['addMain'], {
              queryParams: {
                vmCode: urlParse(window.location.search)['vmCode'],
                token: sessionStorage.getItem('token'),
                payType: 2
              }});
          } else {
            window['AlipayJSBridge'].call('closeWebview');
          }
        }
      }
  }
  getData() {
    this.appService.getAliData(this.appProperties.machineControlUrl,
      {vmCode:  urlParse(window.location.search)['vmCode']}, this.token).subscribe(
      data => {
        console.log(data);
        console.log(this.token);
        if (data.status === 1) {
          this.goodsList = data.returnObject.itemList;
          // this.totalPrice = data.returnObject.totalPrice;
          this.isClosed();
        } else {
          alert(data.message);
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }
  // 检测是否关门
  isClosed() {
    this.appService.getDataOpen(this.appProperties.isClosedUrl,
      {vmCode: urlParse(window.location.search)['vmCode']}, this.token).subscribe(
      data2 => {
        this.count++;
        if (this.count === 25) {
          this.isVisibleOpen = true;
          clearInterval(this.timeInterval);
        }
        console.log(data2);
        if (data2.status !== 1) {
          // alert('您的门还未关闭！优水到家提醒您,为了您账号资金安全,提水后请随手关门');
          if (this.flag === 1 || this.flag === '1'
            || this.flag === 4 || this.flag === '4') {
            this.more = true;
            this.close = true;
            this.single = false;
          } else {
            this.more = false;
            this.close = true;
            this.single = true;
          }
        } else if (data2.status === 1) {
          this.close = false;
          this.more = true;
          this.single = true;
          clearInterval(this.timeInterval);
          this.appService.getAliData(this.appProperties.machineControlGetReplenishInfoUrl + urlParse(window.location.search)['vmCode'], '',
            this.token).subscribe(
            data3 => {
              console.log(data3);
              if (data3.status === 1 && data3.returnObject !== '') {
                this.replenishList = data3.returnObject;
              }  else {
                this.replenishList = [];
                alert(data3.message);
              }
              if (this.flag === 3 || this.flag === '3' || this.flag === 4 || this.flag === '4') {
                this.isVisibleWarn = true;
              }
            },
            error3 => {
              console.log(error3);
            }
          );
          // alert('广州优水到家工程感谢你的惠顾,系统将从零钱或者银行卡中自动扣取本次购买费用。');
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }
  openOk() {
    this.isVisibleOpen = false;
    this.count = 0;
    this.oneGoodsOrMore();
  }
  oneGoodsOrMore() {
    const _this = this;
    if (this.flag === 1 || this.flag === '1'
    || this.flag === 4 || this.flag === '4') {
      this.timeInterval = setInterval(() => {
        _this.isClosed();
      }, 800);
      this.more = true;
      this.close = true;
      this.single = false;
    } else {
      this.timeInterval = setInterval(() => {
        _this.getData();
        // _this.isClosed();
      }, 800);
      this.more = false;
      this.close = true;
      this.single = true;
    }
  }
  getToken () {
    let token;
    if (this.flag === 1 || this.flag === '1'
      || this.flag === 2 || this.flag === '2') {
      token = 'token';
    } else {
      token = 'adminToken';
    }
    if (this.token === null || this.token === undefined || this.token === 'undefined') {
      const strCookie = document.cookie;
      const arrCookie = strCookie.split(';');
      for (let i = 0; i < arrCookie.length; i++) {
        const arr = arrCookie[i].split('=');
        if (arr[0].trim() === token) {
          this.token = arr[1];
        }
      }
    }
  }
}
