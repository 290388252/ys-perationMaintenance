import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RotateComponent} from './rotate.component';

const routes: Routes = [
    {path: '', component: RotateComponent}
    // { path: 'main', loadChildren: './system/common/main/main.module#MainModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RotateRoutingModule {}
