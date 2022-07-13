import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MainComponent } from './component/main.component';

const routes: Routes = [
  { path: 'main', children: [{ path: '', component: MainComponent, canActivate: [AuthGuard] }] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule{}