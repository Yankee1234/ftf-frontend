import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  {
    path: 'main/profile',
    children: [{ path: 'me', component: ProfileComponent, canActivate: [AuthGuard] }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
