import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userExtList: any;

  user: firebase.default.User;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  get email() {return this.loginForm.get('email');}
  get password() {return this.loginForm.get('password');}

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    if(this.user != null && this.user != undefined){
      this.authService.signOut();
      this.router.navigate(['/']);
    }
  }

  onSubmit() {

    this.authService.signIn(this.email.value, this.password.value);
    this.router.navigate(['/']);
  }

}


