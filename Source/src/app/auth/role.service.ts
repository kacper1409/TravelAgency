import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  ROLE_ADMIN = 'A';
  ROLE_PRAC = 'P';
  ROLE_VIP = 'V';
  ROLE_KLIENT = 'K';

  public loggedEmail: string;
  public loggedRole: string;

  constructor() { 
    this.loggedEmail = null;
    this.loggedRole = null;
  }

}
