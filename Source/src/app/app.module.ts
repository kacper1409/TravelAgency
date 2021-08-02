import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TripDetailsComponent } from './trips/trip-details/trip-details.component';
import { TripsListComponent } from './trips/trips-list/trips-list.component';
import { CreateTripComponent } from './trips/create-trip/create-trip.component';
import { BasketComponent } from './basket/basket.component';
import { NameFilterPipe } from './trips/name-filter.pipe';
import { CountryFilterPipe } from './trips/country-filter.pipe';
import { PriceFilterPipe } from './trips/price-filter.pipe';
import { StartDateFilterPipe } from './trips/startDate-filter.pipe';
import { EndDateFilterPipe } from './trips/endDate-filter.pipe';
import { TripSummaryComponent } from './trips/trip-summary/trip-summary.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PersistModeComponent } from './auth/persist-mode/persist-mode.component';


 
@NgModule({
  declarations: [
    AppComponent,
    TripDetailsComponent,
    TripsListComponent,
    CreateTripComponent,
    BasketComponent,
    NameFilterPipe,
    CountryFilterPipe,
    PriceFilterPipe,
    StartDateFilterPipe,
    EndDateFilterPipe,
    TripSummaryComponent,
    RegisterComponent,
    LoginComponent,
    PersistModeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }