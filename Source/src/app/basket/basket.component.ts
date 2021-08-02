import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Trip } from '../trips/trip';
import { TripService } from '../trips/trip.service';
import { UserExtService } from '../users/user-ext.service';
import { UserExt } from '../users/user-ext';
import { RoleService } from '../auth/role.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  tripCounter: number = 0;
  totalSum: number = 0;
  trips: any;
  private subT: any;
  
  constructor(private tripService: TripService, private userExtService: UserExtService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.subT = this.tripService.getTripsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(trips => {
      for (var trip of trips) {
        if (trip.purchasedBy == undefined) {
          trip.purchasedBy = [];
        }
      }
      this.trips = trips.filter(trip => trip.purchasedBy.includes(this.roleService.loggedEmail))
      
    });
  }

  ngOnDestroy() {
    this.subT.unsubscribe();
  }
 
  deleteFromBasket(trip: Trip) {
    let index = trip.purchasedBy.indexOf(this.roleService.loggedEmail);
    console.log(index);
    if (index > -1) { trip.purchasedBy.splice(index, 1); }
    this.tripService.updateTrip(trip.key, trip);
  }

}
