import { analyzeAndValidateNgModules } from '@angular/compiler';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppRouteChangeService } from './app-route-change.service';
import { AuthService } from './auth/auth.service';
import { RoleService } from './auth/role.service';
import { UserExt } from './users/user-ext';
import { UserExtService } from './users/user-ext.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  userExtStr: string;
  title: string = 'ng-Travel';
  private sub: any;

 
  constructor(private db: AngularFireDatabase, 
              private rcs: AppRouteChangeService, 
              private router: Router, 
              private afAuth: AngularFireAuth,
              private authService: AuthService,
              private userExtService: UserExtService,
              public roleService: RoleService) {

    /**
     * Obserwujemy zmiany statusu zalogowania i aktualizujemy email i ew. rolę
     */
    afAuth.onAuthStateChanged((user) => {

      if (user) { // User is signed in
        
        roleService.loggedEmail = user.email;
        
        this.sub = this.userExtService.getUserExtsList().snapshotChanges().pipe(
          map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        ).subscribe(userExtList => {
          let userExt: UserExt = userExtList.filter(userExt => userExt.email == roleService.loggedEmail)[0];
          roleService.loggedRole = (userExt == undefined ? roleService.ROLE_KLIENT : userExt.role);
          console.log("Zdarzenie zalogowania z rolą: " + roleService.loggedRole);
          this.userExtStr =  "Zalogowany użytkownik: " + roleService.loggedEmail + ' [rola: ' + roleService.loggedRole + ']';
        });

      } else {    // User is signed out
        
        if (this.sub != undefined) this.sub.unsubscribe();
        
        roleService.loggedRole = null;
        roleService.loggedEmail = null;
        console.log("Zdarzenie wylogowania");
        this.userExtStr = '';
      }
    });

    /**
     * Podpinamy się pod event routingu i w przypadku routingu "logout" logoutujemy użytkownika
     */
    router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
      console.log("Start navigating to:" + event.url);
      if (event.url == "/logout") authService.signOut();
    });
  }


}