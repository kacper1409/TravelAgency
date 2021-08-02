import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateTripComponent } from './trips/create-trip/create-trip.component';
import { TripsListComponent } from './trips/trips-list/trips-list.component';
import { BasketComponent } from './basket/basket.component';
import { TripDetailsComponent } from './trips/trip-details/trip-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { PersistModeComponent } from './auth/persist-mode/persist-mode.component';

const routes: Routes = [
  { path: 'trips', component: TripsListComponent },
  { path: 'add', component: CreateTripComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'basket', component: BasketComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'tripDetail/:key', component: TripDetailsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'logout', component: TripsListComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' }, // nie błąd, obsłużone w evencie routingu
  { path: 'settings', component: PersistModeComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },

  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: '**', redirectTo: 'trips', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
    
  exports: [RouterModule]
})
export class AppRoutingModule { }
