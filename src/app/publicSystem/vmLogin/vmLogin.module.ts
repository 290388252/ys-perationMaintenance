import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { VmLoginComponent } from './vmLogin.component';
import { VmLoginRoutingModule } from './vmLogin-routing.module';
import {AppProperties} from '../../app.properties';
import {AppService} from '../../app-service';


@NgModule({
  declarations: [
    VmLoginComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    VmLoginRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [AppService, AppProperties]
})
export class VmLoginModule { }
