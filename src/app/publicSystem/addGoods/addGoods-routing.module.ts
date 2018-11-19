import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddGoodsComponent} from './addGoods.component';

const routes: Routes = [
    {path: '', component: AddGoodsComponent}
    // { path: 'main', loadChildren: './system/common/main/main.module#MainModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddGoodsRoutingModule {}
