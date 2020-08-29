import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { DbServiceService } from '../_services/db-service/db-service.service';

@Injectable()
export class EditGuard implements CanActivate {
  constructor(private dbService: DbServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route.paramMap.get('id'))
    return this.dbService.hasEditWithId(route.paramMap.get('id'));
    //Logic of authenticating user by calling some API service.
    // For e.g. Here Authservice has a isAuthenticated() method which further
    // Check user is valid or not.
  }
}
