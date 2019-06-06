import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {urlParse} from '../../utils/util';
import {AddGoodsModule} from './addGoods.module';

@Component({
  selector: 'app-main',
  templateUrl: './addGoods.component.html',
  styleUrls: ['./addGoods.component.css']
})
export class AddGoodsComponent implements OnInit {

  public num;
  public num2;
  public wayNo;
  public times = 1;
  public goods;
  public doorNums;
  public token;
  public count = 1;
  public disableButton = false;
  public backButton = false;
  public sureButtonText = '输入确定';
  public nameOne = '';
  public nameTwo = '';
  public machinesVersion = '';
  public chehuo = '';
  private saveNum = [];
  private openCheckTime = 1;
  private isClick = true;

  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.goods = urlParse(window.location.href)['goods'];
    this.doorNums = urlParse(window.location.href)['doorNums'];
    this.machinesVersion = urlParse(window.location.href)['machinesVersion'];
    this.chehuo = urlParse(window.location.href)['chehuo'] === undefined ? '' : urlParse(window.location.href)['chehuo'];
    console.log(urlParse(window.location.href)['itemName'].split(','));
    this.nameOne = urlParse(window.location.href)['itemName'].split(',')[0];
    this.nameTwo = urlParse(window.location.href)['itemName'].split(',')[1];
  }
  focusCode() {
    document.getElementById('ag-bk').style.height = (document.documentElement.offsetWidth + 100) + 'px';
  }
  phone() {
    window.location.href = 'tel://10086';
  }
  yes() {
    if (this.isClick) {
      this.isClick = false;
      const _this = this;
      if (this.backButton) {
        this.count = 1;
        this.times = 1;
        this.backButton = false;
        this.saveNum = [];
        this.sureButtonText = '输入确定';
      } else {
        if (this.goods === 'true') {
          if (this.num === undefined || this.num2 === undefined) {
            alert('您还有商品数量未输入');
          } else {
            if (this.machinesVersion === 'new') {
              this.adjustOnce();
            } else {
              this.setTimer();
            }
          }
        } else {
          if (this.num === undefined) {
            alert('您还有商品数量未输入');
          } else {
            if (this.machinesVersion === 'new') {
              this.adjustOnce();
            } else {
              this.setTimer();
            }
          }
        }
      }
      setTimeout(function() {
        _this.isClick = true;
      }, 1000);
    }
  }

  adjustOnce() {
    let num;
    if (this.goods === 'true') {
        this.saveNum.push(this.num);
        this.saveNum.push(this.num2);
        num = [this.num, this.num2].join(',');
    } else {
        this.saveNum.push(this.num);
        num = this.num;
        this.count++;
    }
    this.appService.postAliData(this.appProperties.onceReviseUrl,
      {
        vmCode: urlParse(window.location.search)['vmCode'],
        wayNum: urlParse(window.location.search)['wayNo'],
        times: 1,
        num: num,
        orderNumber: urlParse(window.location.href)['orderNumber']
      }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
            // alert('校准成功');
            this.open();
            // this.sureButtonText = '如果有误可重新输入后点此按钮重新校准';
        } else if (data.status === -1) {
          this.router.navigate(['vmLogin'], {
            queryParams: {
              vmCode: urlParse(window.location.search)['vmCode']
            }
          });
        } else if (data.status === 3) {
          alert('校准失败请重试！');
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  setTimer() {
    if (this.times === 2) {
      this.disableButton = true;
      setTimeout( () => {
        this.disableButton = false;
        this.adjust();
      }, 3000);
    } else {
      this.adjust();
    }
  }

  adjust() {
    let num;
    if (this.goods === 'true') {
      if (this.times === 1) {
        this.saveNum.push(this.num);
        this.saveNum.push(this.num2);
        num = [this.num, this.num2].join(',');
        this.count++;
      } else {
        if (Math.abs(this.num - this.saveNum[0]) !== 1 && Math.abs(this.num2 - this.saveNum[1]) !== 1 && this.doorNums !== '5' && this.doorNums !== '8') {
          alert('必须拿出一桶或者放入一桶，两次商品数量差值必须为1');
          return;
        } else {
          num = [this.num, this.num2].join(',');
          this.count++;
          this.sureButtonText = '输入确定';
        }
      }
    } else {
      if (this.times === 1) {
        this.saveNum.push(this.num);
        num = this.num;
        this.count++;
      } else {
        if ((Math.abs(this.num - this.saveNum[0]) !== 1) && this.doorNums !== '5' && this.doorNums !== '8') {
          alert('必须拿出一桶或者放入一桶，两次商品数量差值必须为1');
          return;
        } else {
          num = this.num;
          this.count++;
          this.sureButtonText = '输入确定';
        }
      }
    }
    this.num = undefined;
    this.num2 = undefined;
    this.appService.postAliData(this.appProperties.reviseUrl,
      {
        vmCode: urlParse(window.location.search)['vmCode'],
        wayNum: urlParse(window.location.search)['wayNo'],
        times: this.times,
        num: num,
        orderNumber: urlParse(window.location.href)['orderNumber']
      }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          if (this.times === 2) {
            this.sureButtonText = '如果有误可重新输入后点此按钮重新校准';
            this.backButton = true;
            alert('校准成功');
            if (this.chehuo === '5' || this.chehuo === '6') {
              this.appService.getDataOpen(this.appProperties.addOpendoorUrl,
                {vmCode: urlParse(window.location.search)['vmCode'],
                  wayNum: urlParse(window.location.search)['wayNo'],
                  barterNum: this.chehuo},
                this.token).subscribe(
                datas => {
                  console.log(datas);
                  if (datas.status === 1001) {
                    this.router.navigate(['goodsShow'], {
                      queryParams: {
                        vmCode: urlParse(window.location.search)['vmCode'],
                        cihuo: 1,
                        wayNum: urlParse(window.location.search)['wayNo'],
                        orderNumber: urlParse(window.location.href)['orderNumber'],
                        machinesVersion: this.machinesVersion
                      }});
                    sessionStorage.setItem('flag', '4');
                  } else if (datas.status === 1002) {
                    this.router.navigate(['goodsShow'], {
                      queryParams: {
                        vmCode: urlParse(window.location.search)['vmCode'],
                        cihuo: 1,
                        wayNum: urlParse(window.location.search)['wayNo'],
                        orderNumber: urlParse(window.location.href)['orderNumber'],
                        machinesVersion: this.machinesVersion
                      }});
                    sessionStorage.setItem('flag', '3');
                  } else if (datas.status === -1) {
                    this.router.navigate(['vmLogin']);
                  } else {
                    alert(datas.message);
                  }
                },
                errors => {
                  console.log(errors);
                }
              );
            }
          } else {
            this.times = 2;
          }
          if (this.count >= 3) {
            this.sureButtonText = '如果有误可重新输入后点此按钮重新校准';
            this.backButton = true;
          }
        } else if (data.status === -1) {
          this.router.navigate(['vmLogin'], {
            queryParams: {
              vmCode: urlParse(window.location.search)['vmCode']
            }
          });
        } else if (data.status === 3) {
          this.count = 1;
          alert('校准失败请重试！');
        } else {
          this.count = 1;
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  back() {
    this.router.navigate(['addMain'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
        token: sessionStorage.getItem('token')
      }
    });
  }

  open() {
    this.openCheckTime ++;
    this.disableButton = true;
    const cihuo = this.chehuo === '' ? '' : 1;
    this.appService.getDataOpen(this.appProperties.openCheckAfterReviseUrl,
      {vmCode: urlParse(window.location.search)['vmCode'],
        wayNum: urlParse(window.location.search)['wayNo']},
      this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          alert('校准成功');
          this.disableButton = false;
          this.appService.getDataOpen(this.appProperties.mmsOpenOnceOneUrl,
            {vmCode: urlParse(window.location.search)['vmCode'],
              wayNum: urlParse(window.location.search)['wayNo'], barterNum: this.chehuo},
            this.token).subscribe(
            datas => {
              console.log(datas);
              if (datas.status === 1001) {
                this.router.navigate(['goodsShow'], {
                  queryParams: {
                    vmCode: urlParse(window.location.search)['vmCode'],
                    wayNum: urlParse(window.location.search)['wayNo'],
                    orderNumber: urlParse(window.location.href)['orderNumber'],
                    cihuo: cihuo,
                    machinesVersion: this.machinesVersion
                  }});
                sessionStorage.setItem('flag', '4');
              } else if (datas.status === 1002) {
                this.router.navigate(['goodsShow'], {
                  queryParams: {
                    vmCode: urlParse(window.location.search)['vmCode'],
                    wayNum: urlParse(window.location.search)['wayNo'],
                    orderNumber: urlParse(window.location.href)['orderNumber'],
                    cihuo: cihuo,
                    machinesVersion: this.machinesVersion
                  }});
                sessionStorage.setItem('flag', '3');
              } else if (datas.status === -1) {
                this.router.navigate(['vmLogin']);
              } else {
                alert(datas.message);
              }
            },
            errors => {
              console.log(errors);
            }
          );
        } else {
          if (this.openCheckTime >= 10) {
            this.disableButton = false;
            this.sureButtonText = '如果有误可重新输入后点此按钮重新校准';
            this.openCheckTime = 1;
          } else {
            setTimeout(() => {
              this.open();
            }, 1000);
          }
        }
      },
      error => {
        console.log(error);
      }
    );

  }

}
