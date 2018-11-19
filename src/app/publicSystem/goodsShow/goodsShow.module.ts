import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsShowRoutingModule } from './goodsShow-routing.module';
import { GoodsShowComponent } from './goodsShow.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PopoverModule } from 'ngx-bootstrap';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
      FormsModule,
      CommonModule,
      GoodsShowRoutingModule,
      NgZorroAntdModule,
      PopoverModule.forRoot()
    ],
    declarations: [GoodsShowComponent],
    providers: [AppService, AppProperties],
})
export class GoodsShowModule {}
