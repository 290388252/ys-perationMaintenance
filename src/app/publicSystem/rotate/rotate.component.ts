import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';

declare const WeixinJSBridge: any;

import * as $ from 'jquery';
@Component({
  selector: 'app-rotate',
  templateUrl: './rotate.component.html',
  styleUrls: ['./rotate.component.css']
})
export class RotateComponent implements OnInit {
  private token = 'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJrbWxobzciLCJzdWIiOiJ7XCJpZFwiOlwiMzczXCIsXCJvcGVuSWRcIjpcIm9La1p5MHlBejEyLVlLVkJncVdzU1IzU1RQdUVcIixcInBheVR5cGVcIjpcIjFcIixcInR5cGVcIjoyfSIsImV4cCI6MTUzNTUzODQ3NSwiaWF0IjoxNTM0OTMzNjc1fQ.1kZ7e5UK1_OwMy8b4c_GcpW1Aci7Jg7sFQPMNw60crtE7gi8gnsad0CQcskXors6Uf9KHcTC-L6JLhKuxP7gqg';
  private info = [];
  public clickNum: any;
  constructor(private router: Router,
              private appProperties: AppProperties,
              private appService: AppService) {
  }

  ngOnInit() {
    this.appService.postAliData(this.appProperties.gameGetGamePrize + '?gameId=1', '', this.token).subscribe(
      data => {
        console.log(data);
          data.returnObject.forEach((item) => {
            this.info.push(item.name);
          });
          this.getRotate(this.info, this.appProperties, this.appService, this.token);
        },
      error2 => {
        console.log(error2);
      }
    );

  }

  getRotate(info, appProperties, appService, token) {
    // 旋转角度
    let angles;
    // 可抽奖次数
    this.clickNum = 3;
    // 旋转次数
    let rotNum = 0;
    // 中奖公告
    let notice = null;
    // 转盘初始化
    const color = ['#eeeeee', '#d0d2d2', 'rgba(0,0,0,0)', '#258dff', 'white', '#258dff'];
    // const info = ['谢谢参与', '    10', '   10', '  50', '  100', '   40', '    1', '   20'];
    const info1 = [' ', '       ', '       ', '      ', '      ', '      ', '      ', '      '];
    // const info1 = ['再接再厉', '      元', '      元', '     元', '     元', '     元', '     元', '     元'];
    canvasRun();
    const _this = this;
    $('#tupBtn').bind('click', function () {
      console.log(_this.clickNum);
      appService.postAliData(appProperties.gameLottery + '?gameId=1', '', token).subscribe(
        data => {
          console.log(data);
          if (data.status === 81) {
            alert(data.message);
          } else {
            runCup(data.returnObject);
            // 转盘旋转过程“开始抽奖”按钮无法点击
            $('#tupBtn').attr('disabled');
            // 旋转次数加一
            rotNum = rotNum + 1;
            // “开始抽奖”按钮无法点击恢复点击
            setTimeout(function () {
              alert(notice);
              $('#tupBtn').removeAttr('disabled');
            }, 6000);
          }
        },
        error2 => {
          console.log(error2);
        }
      );
      // if (_this.clickNum >= 1) {
      //   // 可抽奖次数减一
      //   _this.clickNum -= 1;
      //   // 转盘旋转
      //   runCup(appProperties, appService, token);
      //   // 转盘旋转过程“开始抽奖”按钮无法点击
      //   $('#tupBtn').attr('disabled');
      //   // 旋转次数加一
      //   rotNum = rotNum + 1;
      //   // “开始抽奖”按钮无法点击恢复点击
      //   setTimeout(function () {
      //     alert(notice);
      //     $('#tupBtn').removeAttr('disabled');
      //   }, 6000);
      // } else {
      //   alert('亲，抽奖次数已用光！');
      // }
    });

    // 转盘旋转
    function runCup(num) {
      // probability();
      // const num = Math.floor(Math.random() * (7));
      console.log(num);
      // 概率
      if (num === 0) {
        angles = 2160 * rotNum + 1800;
        notice = info[0] + info1[0];
      } else if (num === 1) {
        angles = 2160 * rotNum + 2115;
        notice = info[1] + info1[1];
      } else if (num === 2) {
        angles = 2160 * rotNum + 2070;
        notice = info[2] + info1[2];
      } else if (num === 3) {
        angles = 2160 * rotNum + 2025;
        notice = info[3] + info1[3];
      } else if (num === 4) {
        angles = 2160 * rotNum + 1980;
        notice = info[4] + info1[4];
      } else if (num === 5) {
        angles = 2160 * rotNum + 1935;
        notice = info[5] + info1[5];
      } else if (num === 6) {
        angles = 2160 * rotNum + 1890;
        notice = info[6] + info1[6];
      } else if (num === 7) {
        angles = 2160 * rotNum + 1845;
        notice = info[7] + info1[7];
      }
      const degValue = 'rotate(' + angles + 'deg' + ')';
      console.log(degValue);
      $('#myCanvas').css('-o-transform', degValue);           // Opera
      $('#myCanvas').css('-ms-transform', degValue);          // IE浏览器
      $('#myCanvas').css('-moz-transform', degValue);         // Firefox
      $('#myCanvas').css('-webkit-transform', degValue);      // Chrome和Safari
      $('#myCanvas').css('transform', degValue);
    }

    // 绘制转盘
    function canvasRun() {
      const canvas = document.getElementById('myCanvas');
      const canvas01 = document.getElementById('myCanvas01');
      const canvas03 = document.getElementById('myCanvas03');
      const canvas02 = document.getElementById('myCanvas02');
      const ctx = canvas['getContext']('2d');
      const ctx1 = canvas01['getContext']('2d');
      const ctx3 = canvas03['getContext']('2d');
      const ctx2 = canvas02['getContext']('2d');
      createCircle();
      createCirText();
      initPoint();

      // 外圆
      function createCircle() {
        let startAngle = 0; // 扇形的开始弧度
        let endAngle = 0; // 扇形的终止弧度
        // 画一个8等份扇形组成的圆形
        for (let i = 0; i < 8; i++) {
          startAngle = Math.PI * (i / 4 - 1 / 8);
          endAngle = startAngle + Math.PI * (1 / 4);
          ctx.save();
          ctx.beginPath();
          // ctx.arc(150, 150, 60, startAngle, endAngle, false);
          ctx.arc(150, 150, 100, startAngle, endAngle, false);
          ctx.lineWidth = 120;
          // ctx.lineWidth = 60;
          if (i % 2 === 0) {
            ctx.strokeStyle = color[0];
          } else {
            ctx.strokeStyle = color[1];
          }
          ctx.stroke();
          ctx.restore();
        }
      }

      // 各奖项
      function createCirText() {
        ctx.textAlign = 'start';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color[3];
        const step = 2 * Math.PI / 8;
        for (let i = 0; i < 8; i++) {
          ctx.save();
          ctx.beginPath();
          ctx.translate(150, 150);
          ctx.rotate(i * step);
          ctx.font = ' 20px Microsoft YaHei';
          ctx.fillStyle = color[3];
          // ctx.fillText(info[i], -20, -75, 40);
          ctx.fillText(info[i], -30, -115, 60);
          ctx.font = ' 16px Microsoft YaHei';
          // ctx.fillText(info1[i], -15, -48, 40);
          ctx.fillText(info1[i], -30, -95, 60);
          ctx.closePath();
          ctx.restore();
        }
      }

      function initPoint() {
        // 箭头指针
        ctx1.beginPath();
        // ctx1.moveTo(100, 40);
        // ctx1.lineTo(90, 75);
        // ctx1.lineTo(110, 75);
        // ctx1.lineTo(100, 40);

        ctx1.moveTo(100, 24);
        ctx1.lineTo(90, 62);
        ctx1.lineTo(110, 62);
        ctx1.lineTo(100, 24);
        ctx1.fillStyle = color[5];
        ctx1.fill();
        ctx1.closePath();
        // 中间小圆
        ctx3.beginPath();
        // ctx3.arc(100, 100, 28, 0, Math.PI * 2, false);
        ctx3.arc(100, 100, 40, 0, Math.PI * 2, false);
        ctx3.fillStyle = color[5];
        ctx3.fill();
        ctx3.closePath();
        // 小圆文字
        ctx3.font = 'Bold 20px Microsoft YaHei';
        ctx3.textAlign = 'start';
        ctx3.textBaseline = 'middle';
        ctx3.fillStyle = color[4];
        ctx3.beginPath();
        // ctx3.fillText('开始', 90, 90, 40);
        // ctx3.fillText('抽奖', 90, 110, 40);
        ctx3.fillText('开始', 80, 90, 40);
        ctx3.fillText('抽奖', 80, 110, 40);
        ctx3.fill();
        ctx3.closePath();
        // 中间圆圈
        ctx2.beginPath();
        // ctx2.arc(75, 75, 37, 0, Math.PI * 2, false);
        ctx2.arc(75, 75, 75, 0, Math.PI * 2, false);
        ctx2.fillStyle = color[2];
        ctx2.fill();
        ctx2.closePath();
      }
    }
  }
  // 判断是微信登陆还是支付宝登陆
  urlParse(url): object {
    const obj = {};
    const reg = /[?&][^?&]+=[^?&]+/g;
    const arr = url.match(reg);
    if (arr) {
      arr.forEach(function (item) {
        const tempArr = item.substring(1).split('=');
        const key = decodeURIComponent(tempArr[0]);
        const val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
      });
    }
    return obj;
  }

  close() {
    WeixinJSBridge.call('closeWindow');
  }
}
