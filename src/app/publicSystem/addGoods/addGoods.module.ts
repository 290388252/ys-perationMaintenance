import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddGoodsComponent } from './addGoods.component';
import { AddGoodsRoutingModule } from './addGoods-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {CarouselModule} from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    AddGoodsComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    AddGoodsRoutingModule,
    NgZorroAntdModule,
    CarouselModule.forRoot()
  ],
  providers: [AppService, AppProperties],
  bootstrap: [AddGoodsComponent]
})
export class AddGoodsModule { }
