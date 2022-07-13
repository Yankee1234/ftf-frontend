import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthModule } from "src/app/auth/auth.module";
import { AuthGuard } from "src/app/auth/guards/auth.guard";
import { ProfileComponent } from "./component/profile/profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AuthModule
  ],
  providers: [
    AuthGuard
  ]
})
export class ProfileModule { }
