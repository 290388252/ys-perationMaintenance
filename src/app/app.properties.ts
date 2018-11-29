import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AppProperties {
  // public
  public appUrl: string;
  public adminUrl: string;
  public imgUrl: string;
  public isClosedUrl: string;
  public adminLoginUrl: string;
  public adminOauth2Url: string;
  public addOpendoorUrl: string;
  public operateOpendoorUrl: string;
  public orderResetWaysNumUrl: string;
  public aliMachineQueryVMListUrl: string;
  public aliMachineQueryDetailUrl: string;
  public aliMachineQueryTradeDetailUrl: string;
  public reviseUrl: string;
  public restartUrl: string;
  public volumeUrl: string;
  public canReplenishUrl: string;
  public gameGetGamePrize: string;
  public gameLottery: string;
  public gameGetCusPrize: string;
  public gameReceive: string;
  public machineControlUrl: string;
  public machineControlGetReplenishInfoUrl: string;
  public adminCreateForeverStrQrUrl: string;
  public machineControlAdjustReplenish: string;
  // WeChat
  public indexListUrl: string;
  public smsSendUrl: string;
  // AliPay
  public aliVmGetUserIdUrl: string;

  public useCouponUrl: string;
  public useWaterVouchersUrl: string;

  constructor() {
    // Public
    this.appUrl = 'http://47.106.92.82:6662/ys_mms/mms';
    // this.appUrl = 'http://192.168.0.114:6662/ys_mms/mms';
    this.adminUrl = 'http://119.23.233.123:6662/ys_admin';
    this.imgUrl = this.adminUrl + '/files/';
    this.isClosedUrl = this.appUrl + '/change/isClosed';
    this.adminLoginUrl = this.appUrl + '/login/do'; // old /admin/login
    this.addOpendoorUrl = this.appUrl + '/open/one'; // old /index/yunWeiOpenDoor
    this.operateOpendoorUrl = this.appUrl + '/open/all'; // old /index/operateOpenDoor
    this.orderResetWaysNumUrl = this.appUrl + '/order/resetWaysNum/';
    this.aliMachineQueryVMListUrl = this.appUrl + '/aliMachine/queryVMList';
    this.aliMachineQueryDetailUrl = this.appUrl + '/aliMachine/queryDetail';
    this.aliMachineQueryTradeDetailUrl = this.appUrl + '/aliMachine/queryTradeDetail';
    this.adminOauth2Url = this.appUrl + '/admin/oauth2';
    this.reviseUrl = this.appUrl + '/revise/do'; // old /index/revise
    this.restartUrl = this.appUrl + '/command/restart?vmCode='; // old /machineControl/restart
    this.volumeUrl = this.appUrl + '/command/updateVolume'; // old /index/updateVolume
    this.canReplenishUrl = this.appUrl + '/change/canReplenish'; // old /index/canReplenish
    this.gameGetGamePrize = this.appUrl + '/game/getGamePrize';
    this.gameLottery = this.appUrl + '/game/lottery';
    this.gameGetCusPrize = this.appUrl + '/game/getCusPrize';
    this.gameReceive = this.appUrl + '/game/receive';
    this.machineControlUrl = this.appUrl + '/change/itemInfo'; // old /machineControl/getChangeInfo
    this.machineControlGetReplenishInfoUrl = this.appUrl + '/change/ultimateInfo?vmCode='; // old /machineControl/getReplenishInfo
    this.adminCreateForeverStrQrUrl = this.appUrl + '/admin/createStrQr';
    this.machineControlAdjustReplenish = this.appUrl + '/adjust/replenish?'; // old /machineControl/adjustReplenish

    // WeChat
    this.indexListUrl = this.appUrl + '/item/home'; // old /index/listWay
    this.smsSendUrl = this.appUrl + '/sms/send';

    // AliPay
    this.aliVmGetUserIdUrl = this.appUrl + '/aliUser/getAiInfoUrl';
    //
    this.useCouponUrl = this.appUrl + '/coupon/usedCouponId';
    this.useWaterVouchersUrl = this.appUrl + '/carryWaterVouchers/listPage';
  }
}
