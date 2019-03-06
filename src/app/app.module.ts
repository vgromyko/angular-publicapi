import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { NasaComponent } from './nasa/nasa.component';
import { WeatherComponent } from './weather/weather.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClientsComponent } from './clients/clients.component';
import { FormsModule } from '@angular/forms';
import { MediaComponent } from './media/media.component';
import { AngularFileUploaderModule } from "angular-file-uploader";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NasaComponent,
    WeatherComponent,
    PageNotFoundComponent,
    ClientsComponent,
    MediaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    AngularFileUploaderModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
