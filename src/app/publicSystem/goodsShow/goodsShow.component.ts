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
  public isVisibleTotal = false;
  public token: string;
  public wayNum: string;
  public basicItemId: string;
  public index: string;
  public indexTotal: string;
  public num;
  public numTotal;
  public goodsList = [];
  public count = 0;
  private timeInterval;
  public flag;
  public cihuo;
  public img = this.appProperties.imgUrl;
  public replenishList = [];
  public price: string;
  public machinesVersion: string;
  public couponList;
  public waterVoucherList = [];

  constructor(private router: Router,
              private appProperties: AppProperties,
              private appService: AppService) {
  }
  ngOnInit() {
    this.couponList = [];
    this.waterVoucherList = [];
    this.machinesVersion = urlParse(window.location.search)['machinesVersion'];
    this.flag = sessionStorage.getItem('flag');
    this.token = sessionStorage.getItem('token');
    this.cihuo = urlParse(window.location.search)['cihuo'];
    this.goodsList = [];
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
  turnTotalText(item) {
    let text;
    if (urlParse(window.location.search)['machinesVersion'] === 'new') {
      text = item.sumNewNum === undefined ? `货道总数${item.sumNum}` : `货道总数${item.sumNewNum}`;
    }
    return text;
  }
  fixedNum(item, index) {
    this.isVisibleFixed = true;
    this.wayNum = item.wayNum;
    this.basicItemId = item.basicItemId;
    this.index = index;
  }
  fixedTotalNum(item, index) {
    this.wayNum = item.wayNum;
    this.basicItemId = item.basicItemId;
    this.isVisibleTotal = true;
    this.indexTotal = index;
  }
  yes() {
    this.isVisibleWarn = false;
  }
  yesTotal() {
    console.log(this.numTotal);
    this.appService.getAliData(this.appProperties.machineOnceAdjustReplenishSum +
      `vmCode=${urlParse(window.location.search)['vmCode']}&wayNum=${this.wayNum}&basicItemId=${this.basicItemId}&adjustNum=${this.numTotal}`,
      '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          alert('修改成功');
          this.appService.postAliData(this.appProperties.onceReviseUrl,
            {
              vmCode: urlParse(window.location.search)['vmCode'],
              wayNum: Number.parseInt(urlParse(window.location.search)['wayNum']),
              times: 2,
              num: '1',
              orderNumber: urlParse(window.location.href)['orderNumber']},
            this.token).subscribe(
            datas => {
              console.log(datas);
            }, errors => {
              console.log(errors);
            });
          this.replenishList[this.indexTotal].sumNewNum = this.numTotal;
        } else {
          alert(data.message);
        }
        this.isVisibleTotal = false;
      },
      error2 => {
        console.log(error2);
      }
    );
  }
  fixedYes() {
    let url;
    if (urlParse(window.location.search)['machinesVersion'] === 'new') {
      url = this.appProperties.machineOnceAdjustReplenish;
    } else {
      url = this.appProperties.machineControlAdjustReplenish;
    }
    let num;
    this.cihuo === '1' ? num = -this.num : num = this.num;
    this.appService.getAliData(url +
      `vmCode=${urlParse(window.location.search)['vmCode']}&wayNum=${this.wayNum}&basicItemId=${this.basicItemId}&adjustNum=${num}`,
      '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.replenishList[this.index].changeNewNum = this.num;
          alert('修改成功');
          this.appService.postAliData(this.appProperties.onceReviseUrl,
            {
              vmCode: urlParse(window.location.search)['vmCode'],
              wayNum: Number.parseInt(urlParse(window.location.search)['wayNum']),
              times: 2,
              num: this.num,
              orderNumber: urlParse(window.location.href)['orderNumber']},
            this.token).subscribe(
            datas => {
              console.log(datas);
            }, errors => {
              console.log(errors);
            });
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
          this.goodsList = data.returnObject;
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
        if (this.count === 20) {
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
          this.isVisibleOpen = false;
          clearInterval(this.timeInterval);
          let url;
          if (urlParse(window.location.search)['machinesVersion'] === 'new'
            || urlParse(window.location.search)['machinesVersion'] === 'vision') {
            url = this.appProperties.machineControlGetReplenishInfoNewUrl + urlParse(window.location.search)['vmCode'] + '&currWay=' + Number.parseInt(urlParse(window.location.search)['wayNum']);
          } else {
            url = this.appProperties.machineControlGetReplenishInfoUrl + urlParse(window.location.search)['vmCode'];
          }
          this.appService.getAliData(url, '',
            this.token).subscribe(
            data3 => {
              console.log(data3);
              if (data3.status === 1 && data3.returnObject !== '') {
                this.replenishList = data3.returnObject;
                this.appService.postAliData(this.appProperties.onceReviseUrl,
                  {
                    vmCode: urlParse(window.location.search)['vmCode'],
                    wayNum: Number.parseInt(urlParse(window.location.search)['wayNum']),
                    times: 2,
                    num: '1',
                    orderNumber: urlParse(window.location.href)['orderNumber']},
                  this.token).subscribe(
                  datas => {
                    console.log(datas);
                  }, errors => {
                    console.log(errors);
                  });
              } else {
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
}
