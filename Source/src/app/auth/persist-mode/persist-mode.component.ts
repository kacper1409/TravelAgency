import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { PersistModeService } from '../persist-mode.service';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-persist-mode',
  templateUrl: './persist-mode.component.html',
  styleUrls: ['./persist-mode.component.css']
})
export class PersistModeComponent implements OnInit {

  persistForm = new FormGroup({
    persistence: new FormControl()
  },
  );

  get persistence() { return this.persistForm.get('persistence'); }
  
  constructor(public roleService: RoleService, 
              private angularFireAuth: AngularFireAuth,
              public persistModeService: PersistModeService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
 
    console.log(this.persistence.value);
    if (this.persistence.value == 'Local') {
      this.angularFireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }

    else if (this.persistence.value == 'Session') {
      this.angularFireAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION); 
    }

    else if (this.persistence.value == 'None') {
      this.angularFireAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    } 

    else {
      alert('Nie wybrano trybu')
      return;
    }
    
    alert('Ustawiono tryb persystencji na: ' + this.persistence.value);
    this.router.navigate(['/']);
  }

}
