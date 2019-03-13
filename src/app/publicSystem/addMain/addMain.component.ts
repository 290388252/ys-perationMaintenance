import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {urlParse} from '../../utils/util';
import {AddMainModule} from './addMain.module';

@Component({
  selector: 'app-main',
  templateUrl: './addMain.component.html',
  styleUrls: ['./addMain.component.css']
})
export class AddMainComponent implements OnInit {
  public item;
  public indexList = [];
  public eightIndexList = [];
  public eightDoorFlag = 0;
  public fiveIndexListLeft = [];
  public fiveIndexListRigth = [];
  private wayNumber: number;
  public loadingVisible = false;
  public isVisibleOpenDoor = false;
  public isVisiblebuhuo = false;
  public isVisibleOpenEightDoor = false;
  public isVisibleOpenDetail = false;
  public isVisibleOpenState = false;
  public isVisibleOpenFailState = false;
  public isVisibleOpenSuccess = false;
  public purchaseTestResult  = false;
  public nopurchaseTestResult  = false;
  public replenishTestResult = false;
  public noreplenishTestResult = false;
  public token: string;
  public state: string;
  public failStateRemark: string;
  public selectState = 0;
  public count = 1;
  public restartTimes = 15; // 重启时间（秒）
  public num: number;
  public num2: number;
  public wayNo: number;
  public wayIndex: number;
  public temperature: number;
  // public img = 'http://lenvar-resource-products.oss-cn-shenzhen.aliyuncs.com/';
  // public img = 'http://119.23.233.123:6662/ys_admin/files/';
  public img = this.appProperties.imgUrl;
  public clickMore = false;
  public isFourDoor = false; // 四门
  public isFiveDoor = false; // 五门
  public isEightDoor = false; // 8门
  public isVisible = false;
  public isOkLoading = false;
  public visible = false;
  public volValue;
  public fullNum;
  public recommendCapacity;
  public numDetail;
  public costPrice;
  public price;
  public weight;
  public oneWeight;
  public itemName;

  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }

  ngOnInit() {
    // 数据初始化
    this.token = urlParse(window.location.search)['token'];
    console.log(urlParse(window.location.search)['token']);
    sessionStorage.setItem('token', urlParse(window.location.search)['token']);
    // 数据初始化
    this.getInitData();
    if (this.token === null
      || this.token === undefined
      || this.token === 'undefined') {
      this.getAuth();
    } else {
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30);
      document.cookie = 'adminToken=' + urlParse(window.location.search)['token'] + ';expired=' + exp.toUTCString();
      if (urlParse(window.location.search)['payType'] === '1') {
        this.canReplenish('main');
      } else if (urlParse(window.location.search)['payType'] === '2') {
        this.canReplenish('aliMain');
      }
    }
    this.volValue = 0;
  }
  selectDoor(num) {
    if (this.isFiveDoor || this.isEightDoor) {
        this.wayIndex = num - 1;
    } else {
      if (num === 3) {
        this.wayIndex = 0;
      } else if (num === 4) {
        this.wayIndex = 1;
      } else if (num === 1) {
        this.wayIndex = 2;
      } else if (num === 2) {
        this.wayIndex = 3;
      } else if (num === 5) {
        this.wayIndex = 4;
      }
    }
    if (this.indexList[this.wayIndex]['wayItemList'].length > 1) {
      this.visible = true;
    } else {
      this.visible = false;
    }
    const orderNumber = [];
    const itemName = [];
    for (let i = 0; i < this.indexList[this.wayIndex]['wayItemList'].length; i++) {
      orderNumber.push(this.indexList[this.wayIndex]['wayItemList'][i].orderNumber);
      itemName.push(this.indexList[this.wayIndex]['wayItemList'][i].itemName);
    }
    // 跳转校准
    this.router.navigate(['addGoods'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
        goods: this.visible,
        orderNumber: orderNumber.join(','),
        itemName: itemName.join(','),
        wayNo: this.wayNo,
        doorNums: this.indexList.length
      }
    });
  }

  selectGood(num) {
    console.log(num);
  }

  canReplenish(url) {
    this.appService.getDataOpen(this.appProperties.canReplenishUrl,
      {vmCode: urlParse(window.location.search)['vmCode']}, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
        } else if (data.status === -1) {
          this.getAuth();
        } else {
          alert(data.message);
          this.router.navigate([url], {
            queryParams: {
              vmCode: urlParse(window.location.search)['vmCode']
            }
          });
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }
  getAuth() {
    if (urlParse(window.location.search)['payType'] === '1') {
      // 微信授权登陆验证
      this.appService.getData(this.appProperties.adminOauth2Url, '').subscribe(
        data => {
          console.log(data);
          let newData;
          const newWlhUrl = '/vmLogin?vmCode=' + urlParse(window.location.search)['vmCode'] + '-/addMain?vmCode='
            + urlParse(window.location.search)['vmCode'];
          if (typeof(data.data) === 'string' && data.data.length > 0) {
            newData = data.data.replace(data.data.substring(data.data.indexOf('state=') + 6, data.data.length),
              newWlhUrl);
            console.log(newData);
            window.location.href = newData;
          }
        },
        error => {
          console.log(error);
        }
      );
    } else if (urlParse(window.location.search)['payType'] === '2') {
      // 支付宝授权登陆验证
      const newWlhUrl = '?state=/vmLogin?vmCode=' + urlParse(window.location.search)['vmCode'] + '-/addMain?vmCode='
        + urlParse(window.location.search)['vmCode'];
      this.appService.getData(this.appProperties.aliVmGetUserIdUrl + '?vmCode=' + urlParse(window.location.search)['vmCode'], '').subscribe(
        data2 => {
          console.log(data2);
          window.location.href = data2.returnObject + newWlhUrl;
        },
        error2 => {
          console.log(error2);
        }
      );
      // window.location.href = this.appProperties.aliVmGetUserIdUrl + newWlhUrl;
      // this.router.navigate(['vmLogin'], {
      //   queryParams: {
      //     vmCode: urlParse(window.location.search)['vmCode'],
      //     payType: 2
      //   }});
    }
  }
  // 初始化选水界面
  getInitData() {
    this.appService.getDataOpen(this.appProperties.indexListUrl, {
      vmCode: urlParse(window.location.search)['vmCode'],
      type: 2
    }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          if (data.returnObject.wayInfo.length <= 4) {
            this.isFourDoor = true;
            this.isFiveDoor = false;
            this.isEightDoor = false;
            this.indexList = data.returnObject.wayInfo;
            for (let i = 0; i < 2; i++) {
              this.indexList.unshift(this.indexList.pop());
            }
          } else if (data.returnObject.wayInfo.length === 5) {
            this.indexList = data.returnObject.wayInfo;
            this.fiveIndexListLeft = [];
            this.fiveIndexListRigth = [];
            this.isFourDoor = false;
            this.isFiveDoor = true;
            this.isEightDoor = false;
            data.returnObject.wayInfo.forEach((item, index) => {
              if (index > 1) {
                this.fiveIndexListRigth.push(item);
              } else {
                this.fiveIndexListLeft.push(item);
              }
            });
          } else if (data.returnObject.wayInfo.length === 8) {
            this.isFourDoor = false;
            this.isFiveDoor = false;
            this.isEightDoor = true;
            this.indexList = data.returnObject.wayInfo;
            this.eightIndexList = data.returnObject.wayInfo.slice(0, 4);
          }
          console.log(this.indexList);
          this.temperature = data.returnObject.temperature;
          //   let volvalue = data.data.volume;
          //   // this.beginvolValue = data.data.volume;
          //   if(volvalue === undefined) {
          //     volvalue = 0;
          //   }
          //   this.beginvolValue = volvalue;
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
    this.appService.postAliData(this.appProperties.mmsMachinesTestGetStateUrl + `?vmCode=${urlParse(window.location.search)['vmCode']}`, {
    }, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.state = data.returnObject.state;
          if (data.returnObject.error) {
            alert(data.returnObject.error);
          }
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  detail(item, event, weight) {
    event.stopPropagation();
    console.log(item);
    this.itemName = item.itemName;
    this.costPrice = item.costPrice;
    this.weight = weight;
    this.oneWeight = item.weight;
    this.fullNum = item.fullNum;
    this.recommendCapacity = item.recommendCapacity;
    this.numDetail = item.num;
    this.isVisibleOpenDetail = true;
  }

  eigthDoorChoose(flag) {
    this.eightDoorFlag = flag;
    if (flag === 0) {
      this.eightIndexList = this.indexList.slice(0, 4);
    } else if (flag === 1) {
      this.eightIndexList = this.indexList.slice(4, 8);
    }
  }
  yesOpenDoor(item) {
    this.isVisiblebuhuo = true;
    this.item = item;
  }
  noOpenDoor() {
    this.isVisiblebuhuo = false;
  }
  // 开门接口
  openDoor(flag) {
    if (this.token === null
      || this.token === undefined
      || this.token === 'undefined') {
      alert('登陆超时,请重新登陆');
      this.router.navigate(['vmLogin'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode']
        }
      });
    } else {
      if (this.clickMore) {
        alert('亲,服务器还没反应过来,请勿再点击');
      } else {
        this.clickMore = true;
        if (flag === 1) {
          this.appService.getDataOpen(this.appProperties.addOpendoorUrl,
            {vmCode: urlParse(window.location.search)['vmCode'], wayNum: this.item.wayNumber, barterNum: 1},
            this.token).subscribe(
            data => {
              console.log(data);
              this.clickMore = false;
              if (data.status === 1001) {
                this.router.navigate(['goodsShow'], {
                  queryParams: {
                    vmCode: urlParse(window.location.search)['vmCode'],
                    cihuo: 1,
                  }});
                sessionStorage.setItem('flag', '4');
              } else if (data.status === 1002) {
                this.router.navigate(['goodsShow'], {
                  queryParams: {
                    vmCode: urlParse(window.location.search)['vmCode'],
                    cihuo: 1,
                  }});
                sessionStorage.setItem('flag', '3');
              } else if (data.status === -1) {
                this.router.navigate(['vmLogin']);
              } else {
                alert(data.message);
              }
            },
            error => {
              console.log(error);
            }
          );
        } else if (flag === 2) {
          this.appService.getDataOpen(this.appProperties.addOpendoorUrl,
            {vmCode: urlParse(window.location.search)['vmCode'], wayNum: this.item.wayNumber},
            this.token).subscribe(
            data => {
              console.log(data);
              this.clickMore = false;
              if (data.status === 1001) {
                // this.isVisibleOpen = true;
                this.router.navigate(['goodsShow'], {
                  queryParams: {
                    vmCode: urlParse(window.location.search)['vmCode'],
                    // flag: 4,
                  }});
                sessionStorage.setItem('flag', '4');
              } else if (data.status === 1002) {
                this.router.navigate(['goodsShow'], {
                  queryParams: {
                    vmCode: urlParse(window.location.search)['vmCode'],
                    // flag: 3,
                  }});
                sessionStorage.setItem('flag', '3');
              } else if (data.status === -1) {
                this.router.navigate(['vmLogin']);
              } else {
                alert(data.message);
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    }
  }

  // 校准数量
  resetNum() {
    console.log(urlParse(window.location.search)['vmCode']);
    this.appService.getAliData(this.appProperties.orderResetWaysNumUrl + urlParse(window.location.search)['vmCode'],
      '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          alert('成功');
          this.getInitData();
        } else {
          alert(data.msg);
          this.getInitData();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // 调节音量
  adjustVol(): void {
    this.isVisible = true;
    // this.endVole = this.beginvolValue;
    // if(this.endVole === undefined || this.endVole === '无' || this.endVole === '99') {
    //   this.endVole = 0;
    // }
    // this.volValue = this.endVole;
    this.volValue = 0;
    console.log('vmcode');
    console.log(urlParse(window.location.search)['vmCode']);
    console.log(this.volValue);
  }

  // 音量提交
  myVolOk(): void {
    console.log('123');
    this.appService.getAliData(this.appProperties.volumeUrl,
      {'volume': this.volValue, 'vmCode': urlParse(window.location.search)['vmCode']}, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          alert(data.message);
          this.getInitData();
          this.isOkLoading = true;
          this.isVisible = false;
          // this.isConfirmLoading = true;
          // setTimeout(() => {
          //   this.myVol = false;
          //   this.isConfirmLoading = false;
          // }, 3000);
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );

  }

// 音量模态框关闭
  myVolCancel(): void {
    // if (this.endVole === '99' || this.endVole === '无') {
    //   this.beginvolValue = this.endVole;
    // }
    this.isVisible = false;
  }

  // 校准重量
  resetWeight() {
    this.wayNo = undefined;
    this.num = undefined;
    this.count = 1;
    if (this.isEightDoor) {
      this.isVisibleOpenEightDoor = true;
    } else {
      this.isVisibleOpenDoor = true;
    }
  }

  // 机器重启
  reStart() {
    this.appService.getAliData(this.appProperties.restartUrl + urlParse(window.location.search)['vmCode'],
      '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.loadingVisible = true;
          const timer = setInterval(() => {
            this.restartTimes--;
            if (this.restartTimes <= 0) {
              this.loadingVisible = false;
              clearInterval(timer);
            }
          }, 1000);
        } else if (data.status === -1) {
          this.router.navigate(['vmLogin']);
        } else {
          alert(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openAll() {
    let way;
    if (this.isFourDoor) {
      way = '1,2,3,4';
    } else {
      way = '1,2,3,4,5';
    }
    this.appService.postAliData(this.appProperties.operateOpendoorUrl
      + '?vmCode=' + urlParse(window.location.search)['vmCode'],
      // + '&wayNum=' + way,
      '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.code === -1) {
          this.router.navigate(['vmLogin']);
        } else if (data.code === 0) {
          // this.isVisibleOpen = true;
          this.router.navigate(['goodsShow'], {
            queryParams: {
              vmCode: urlParse(window.location.search)['vmCode'],
              // flag: 4,
            }});
          sessionStorage.setItem('flag', '4');
        }  else if (data.code === 4) {
          this.router.navigate(['goodsShow'], {
            queryParams: {
              vmCode: urlParse(window.location.search)['vmCode'],
              // flag: 3,
            }});
          sessionStorage.setItem('flag', '3');
        } else {
          alert(data.msg);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  no() {
    this.isVisibleOpenDoor = false;
    this.isVisibleOpenEightDoor = false;
    // console.log(this.radioValue);
  }

  closeDetail() {
    this.isVisibleOpenDetail = false;
    this.isVisibleOpenState = false;
    this.isVisibleOpenFailState = false;
    this.isVisibleOpenSuccess = false;
  }

  turnImg(item) {
    let img;
    if (item.length > 1) {
      img = this.img + item[1].pic;
    } else {
      img = '';
    }
    return img;
  }

  turn(item, flag) {
    let text;
    if (item.length > 1) {
      switch (flag) {
        case 'img':
          text = this.img + item[1].pic;
          break;
        case 'num':
          text = item[1].num;
          break;
        default:
          text = '';
      }
    }
    return text;
  }
  mselectState(flag) {
    console.log(flag);
    const _this = this;
      switch (flag) {
        case '1':
          this.isVisibleOpenFailState = true;
          break;
        case '2':
          machinesTest(this.appProperties.mmsMachinesTestSuccessUrl + `?vmCode=${urlParse(window.location.search)['vmCode']}&remark=${'成功'}`, '已将测试设置为成功');
          break;
        case '3':
          machinesTest(this.appProperties.mmsMachinesTestStartUrl + `?vmCode=${urlParse(window.location.search)['vmCode']}`, '已开始测试');
          break;
        case '4':
          machinesTest(this.appProperties.mmsMachinesTestGetTestResultUrl + `?vmCode=${urlParse(window.location.search)['vmCode']}`, '成功');
          break;
      }
      function machinesTest(url, message) {
        _this.appService.postAliData(url, '', _this.token).subscribe(
          data => {
            console.log(data);
            if (data.status === 1) {
              if (message === '成功') {
                _this.isVisibleOpenState = true;
                _this.purchaseTestResult = data.returnObject.purchaseTestResult;
                _this.replenishTestResult  = data.returnObject.replenishTestResult ;
              } else {
                alert(message);
              }
            }  else if (data.status === 1704) {
              _this.isVisibleOpenSuccess = true;
              _this.nopurchaseTestResult = data.returnObject.notPurchaseTest;
              _this.noreplenishTestResult  = data.returnObject.notReplenishTest ;
            } else {
              alert(data.message);
            }
          },
          error => {
            console.log(error);
          }
        );
      }
  }
  commit() {
    this.appService.postAliData(this.appProperties.mmsMachinesTestFailUrl + `?vmCode=${urlParse(window.location.search)['vmCode']}&remark${this.failStateRemark}`, '', this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          alert('已将测试设置为失败');
          this.isVisibleOpenFailState = false;
        } else {
          alert(data.message);
          this.isVisibleOpenFailState = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
