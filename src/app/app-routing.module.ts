
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NasaComponent } from './nasa/nasa.component';
import { WeatherComponent } from './weather/weather.component';
import { ClientsComponent } from './clients/clients.component';
import { MediaComponent } from './media/media.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'}, 
  {path: 'home', component: HomeComponent},
  {path: 'nasa', component: NasaComponent},
  {path: 'weather', component: WeatherComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'media', component: MediaComponent},
 // {path: 'clients/:id', component: ClientsDetailComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ 
  HomeComponent,
  NasaComponent, 
  WeatherComponent , 
  ClientsComponent ,
  MediaComponent,
  PageNotFoundComponent
];
