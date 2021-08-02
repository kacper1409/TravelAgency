import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User = null;
  user$: Observable<firebase.User>; 

  angularAuth: AngularFireAuth;
  
  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = angularFireAuth.authState;
    this.angularAuth = angularFireAuth;
    this.user$.subscribe(result => {
      this.user = result;
      if(result == null){
        this.signOut();
      }
    });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(result => {
      this.user = result.user;
    }).catch(error => {
      alert("Wystąpił błąd logowania użytkownika:\n" + error);
    });
  }

  signOut() {
    this.angularFireAuth.signOut().then(result => {
      this.user = null;
    });
  }

  checkSignedIn(): boolean {
    return this.angularAuth.currentUser !== null;
  }

  signUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(result => {
      this.user = result.user;
      alert("Użytkownik został zarejestrowany");
    }).catch((error) => {
      alert("Wystąpił błąd podczas rejestracji użytkownika:\n" + error);
    });
  }

}
