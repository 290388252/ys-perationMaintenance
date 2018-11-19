import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VmLoginComponent} from './vmLogin.component';

const routes: Routes = [
    {path: '', component: VmLoginComponent}
    // { path: 'main', loadChildren: './system/common/main/main.module#MainModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VmLoginRoutingModule {}
