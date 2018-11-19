import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-detail',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  public uploaderAdd: FileUploader;
  public messageAdd = '商品图片';
  public addPicList = [];
  public mPic: any;
  public imgPath: any;
  radioValue = '1';
  public emoji = true;
  constructor(private router: Router,
              private appProperties: AppProperties,
              private appService: AppService) {
    this.imgPath = 'http://192.168.0.108:6662/ys_admin/messageImg/';
    this.uploaderAdd = new FileUploader({
      url:  'http://192.168.0.108:6662/ys_admin/customerMessage/uploadImage?token=' + 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzA0LDEiLCJleHAiOjE1MzQ4NDYwMDJ9.-Sc1sVuUYx6nIwfvIHmhYFW21kWpVRVArCahfLHZGkPMYGuR1gBu5XiFMd3x3g2pEMBuNEjwJ8Ow56xmKZ0lVQ',
      method: 'POST',
      itemAlias: 'uploadedfile',
      autoUpload: true,
      removeAfterUpload: true
    });
  }
  ngOnInit() {
  }
  uploadAdd(event) {
    const self = this;
    const arrlist = [];
    this.uploaderAdd.onSuccessItem = function (response, status, headers) {
      if (status !== null || status !== undefined) {
        self.messageAdd = event.target.value;
        console.log(event);
        self.mPic = status;
        // console.log('self.mPic');
        // console.log(self.mPic);
        console.log(status);
        arrlist.push(status);
        self.addPicList = arrlist;
        if (self.addPicList.length > 3) {
          self.addPicList.shift();
        }
        console.log(self.addPicList);
      } else {
        alert('上传出错，请重新上传');
      }
    };
    this.uploaderAdd.uploadAll();
  }
  open() {
     this.emoji = !this.emoji;
  }
  select(flag) {
    console.log(flag);
    const src = `<img style="width: 20px" src="../../../assets/emoji/${flag}.png">`;
    document.getElementById('emoji').innerHTML += src;
  }
  commit() {
    console.log(this.radioValue);
  }
}
