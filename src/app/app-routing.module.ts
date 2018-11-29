import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [/*
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'not-found' }*/
    { path: '', redirectTo: '/addMain', pathMatch: 'full' },
// public
    { path: 'vmLogin', loadChildren: './publicSystem/vmLogin/vmLogin.module#VmLoginModule' },
    { path: 'addMain', loadChildren: './publicSystem/addMain/addMain.module#AddMainModule' },
    { path: 'addGoods', loadChildren: './publicSystem/addGoods/addGoods.module#AddGoodsModule' },
    { path: 'comment', loadChildren: './publicSystem/comment/comment.module#CommentModule' },
    { path: 'goodsShow', loadChildren: './publicSystem/goodsShow/goodsShow.module#GoodsShowModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
