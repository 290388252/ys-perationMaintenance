import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './comment.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PopoverModule } from 'ngx-bootstrap';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {WeUiModule} from 'ngx-weui';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CommentRoutingModule,
        NgZorroAntdModule,
      WeUiModule.forRoot(),
      FileUploadModule,
      FormsModule,
        PopoverModule.forRoot()
    ],
    declarations: [CommentComponent],
    providers: [AppService, AppProperties],
})
export class CommentModule {}
