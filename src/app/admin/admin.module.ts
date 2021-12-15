import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./log-in/log-in.component";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { HeaderAdminComponent } from "./header-admin/header-admin.component";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "../services/auth.service";
import { EditPageComponent } from './edit-page/edit-page.component';
import { QuillModule } from "ngx-quill";
import { SearchPipe } from "./shared/search.pipe";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    CreateTourComponent,
    DashboardComponent,
    HeaderAdminComponent,
    EditPageComponent,
    SearchPipe
  ],
  imports:[CommonModule, FormsModule, ReactiveFormsModule, QuillModule.forRoot(), RouterModule.forChild([
    {path:'', component: AdminLayoutComponent, children: [
      {path:'', redirectTo:'dashboard', pathMatch:'full'},
      {path:'login', component: LoginComponent},
      {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
      {path:'create', component: CreateTourComponent, canActivate:[AuthGuard]},
      {path: ':id/edit', component: EditPageComponent, canActivate:[AuthGuard]}
    ]}
  ])],
  exports:[RouterModule],
  providers:[AuthService, AuthGuard]
})
export class AdminModule {

}