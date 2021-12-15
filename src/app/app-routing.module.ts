import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './shared/about/about.component';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { HomeComponent } from './shared/home/home.component';
import { HotComponent } from './shared/hot/hot.component';
import { PricesComponent } from './shared/prices/prices.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'tour', component:PricesComponent},
  {path:'hot', component:HotComponent},
  {path:'gallery', component:GalleryComponent},
  {path:'about', component:AboutComponent},
  {path: 'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
