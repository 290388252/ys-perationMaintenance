import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddMainComponent} from './addMain.component';
import {AddMainModule} from './addMain.module';

const routes: Routes = [
    {path: '', component: AddMainComponent}
    // { path: 'main', loadChildren: './system/common/main/main.module#MainModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddMainRoutingModule {}
