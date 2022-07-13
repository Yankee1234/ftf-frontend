import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main-routing.module';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AuthModule,
    
  ],
  providers: [
    AuthGuard
  ]
})
export class MainModule {}
