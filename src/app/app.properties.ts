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
  public machineInfoGetCompanyIdUrl: string;
  public adminCreateForeverStrQrUrl: string;
  public machineControlAdjustReplenish: string;
  // WeChat
  public indexListUrl: string;
  public indexOpenDoor: string;
  public wechatOauth2Url: string;
  public smsSendUrl: string;
  public followWechatSubscription: string;
  public wechatRegisterUrl: string;
  public findAllUserOrderUrl: string;
  public findAllOpenIdOrderUrl: string;
  public orderUnifiedOrderUrl: string;
  public nonePassWordPayUrl: string;
  public findMachineHistoryUrl: string;
  public wechatShareInfoUrl: string;
  public couponAvailable: string;
  // AliPay
  public aliIndexListUrl: string;
  public aliGetUserIdUrl: string;
  public aliVmGetUserIdUrl: string;
  public aliOpenDoorUrl: string;
  public aliGetCreditWithheldUrl: string;
  public aliRegisterUrl: string;
  public aliSmsSendUrl: string;
  public aliFindAllUserOrderUrl: string;
  public aliFindPayOrderUrl: string;
  public aliFindNotPayOrderUrl: string;
  public alipayWapPayUrl: string;
  public aliLoginVerifyOperateUrl: string;
  public aliBusinessIsAttentionUrl: string;

  public storeOrderFininshPayUrl: string;
  public useCouponUrl: string;
  public useWaterVouchersUrl: string;

  constructor() {
    // Public
    this.appUrl = 'http://47.106.92.82:6662/ys_sms';
    // this.appUrl = 'http://192.168.0.121:6662/ys_sms';
    this.adminUrl = 'http://119.23.233.123:6662/ys_admin';
    this.imgUrl = this.adminUrl + '/files/';
    this.isClosedUrl = this.appUrl + '/wechat/isClosed';
    this.adminLoginUrl = this.appUrl + '/admin/login';
    this.addOpendoorUrl = this.appUrl + '/index/yunWeiOpenDoor';
    this.operateOpendoorUrl = this.appUrl + '/index/operateOpenDoor';
    this.orderResetWaysNumUrl = this.appUrl + '/order/resetWaysNum/';
    this.aliMachineQueryVMListUrl = this.appUrl + '/aliMachine/queryVMList';
    this.aliMachineQueryDetailUrl = this.appUrl + '/aliMachine/queryDetail';
    this.aliMachineQueryTradeDetailUrl = this.appUrl + '/aliMachine/queryTradeDetail';
    this.adminOauth2Url = this.appUrl + '/admin/oauth2';
    this.reviseUrl = this.appUrl + '/index/revise';
    this.restartUrl = this.appUrl + '/machineControl/restart?vmCode=';
    this.volumeUrl = this.appUrl + '/index/updateVolume';
    this.canReplenishUrl = this.appUrl + '/index/canReplenish';
    this.gameGetGamePrize = this.appUrl + '/game/getGamePrize';
    this.gameLottery = this.appUrl + '/game/lottery';
    this.gameGetCusPrize = this.appUrl + '/game/getCusPrize';
    this.gameReceive = this.appUrl + '/game/receive';
    this.machineControlUrl = this.appUrl + '/machineControl/getChangeInfo';
    this.machineControlGetReplenishInfoUrl = this.appUrl + '/machineControl/getReplenishInfo?vmCode=';
    this.machineInfoGetCompanyIdUrl = this.appUrl + '/machineInfo/getCompanyId?vmCode=';
    this.adminCreateForeverStrQrUrl = this.appUrl + '/admin/createStrQr';
    this.machineControlAdjustReplenish = this.appUrl + '/machineControl/adjustReplenish?';

    // WeChat
    this.indexListUrl = this.appUrl + '/index/listWay';
    this.indexOpenDoor = this.appUrl + '/index/openDoor';
    this.wechatOauth2Url = this.appUrl + '/wechat/oauth2';
    this.smsSendUrl = this.appUrl + '/sms/send';
    this.wechatRegisterUrl = this.appUrl + '/wechat/register';
    this.followWechatSubscription = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0NzQ4MTY0Mg==&scene=124#wechat_redirect';
    // this.findAllUserOrderUrl = this.appUrl + '/order/myOrderList';
    this.findAllUserOrderUrl = this.appUrl + '/alipayRecord/getCustomerOrder';
    this.findAllOpenIdOrderUrl = this.adminUrl + '/order/findOrderByOpenId?openId=';
    this.orderUnifiedOrderUrl = this.appUrl + '/order/unifiedOrder';
    this.nonePassWordPayUrl = this.appUrl + '/wechat/entrustweb';
    this.findMachineHistoryUrl = this.adminUrl + '/payRecord/findMachineHistory';
    this.wechatShareInfoUrl = this.appUrl + '/wechat/shareInfo';
    this.couponAvailable = this.appUrl + '/coupon/available';

    // AliPay
    this.aliIndexListUrl = this.appUrl + '/aliUser/queryItem';
    this.aliGetUserIdUrl = this.appUrl + '/aliUser/getAuthorizationUrl';
    this.aliVmGetUserIdUrl = this.appUrl + '/aliUser/getAiInfoUrl';
    this.aliOpenDoorUrl = this.appUrl + '/aliBusiness/weightOpenDoor';
    this.aliRegisterUrl = this.appUrl + '/aliBusiness/register';
    this.aliSmsSendUrl = this.appUrl + '/alisms/send';
    // this.aliFindAllUserOrderUrl = this.appUrl + '/aliBusiness/findAllUserOrder';
    this.aliFindAllUserOrderUrl = this.appUrl + '/alipayRecord/getCustomerOrder';
    this.aliFindPayOrderUrl = this.appUrl + '/aliBusiness/findPayOrder';
    this.aliFindNotPayOrderUrl = this.appUrl + '/aliBusiness/findNotPayOrder';
    this.alipayWapPayUrl = this.appUrl + '/alipay/wapPay?payRecordId=';
    this.aliGetCreditWithheldUrl = this.appUrl + '/aliUser/getCreditWithheld?vmCode=';
    this.aliLoginVerifyOperateUrl = this.appUrl + '/aliLogin/verifyOperate';
    this.aliBusinessIsAttentionUrl = this.appUrl + '/aliBusiness/isAttention';

    this.storeOrderFininshPayUrl = this.appUrl + '/order/storeOrderFininshPay';
    this.useCouponUrl = this.appUrl + '/coupon/usedCouponId';
    this.useWaterVouchersUrl = this.appUrl + '/carryWaterVouchers/listPage';
  }
}
