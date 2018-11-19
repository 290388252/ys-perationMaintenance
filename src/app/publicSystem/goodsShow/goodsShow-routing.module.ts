import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsShowComponent} from './goodsShow.component';

const routes: Routes = [
    {path: '', component: GoodsShowComponent}
    // { path: 'main', loadChildren: './system/common/main/main.module#MainModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GoodsShowRoutingModule {}
