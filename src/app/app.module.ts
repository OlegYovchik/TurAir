import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';

import { HeaderComponent } from './shared/header/header.component';
import { AboutComponent } from './shared/about/about.component';
import { LoginComponent } from './admin/log-in/log-in.component';
import { HomeComponent } from './shared/home/home.component';
import { PricesComponent } from './shared/prices/prices.component';
import { HotComponent } from './shared/hot/hot.component';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppComponent } from './app.component';
import { ToursService } from './services/tours.service';
import { AuthInterceptor } from './auth.interceptor';
import { NgPipesModule } from 'ngx-pipes';
import { QuillModule } from 'ngx-quill';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    PricesComponent,
    HotComponent,
    GalleryComponent,
    FooterComponent,
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AdminModule,
    NgPipesModule,
    QuillModule.forRoot()
    ],
  providers: [ToursService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
