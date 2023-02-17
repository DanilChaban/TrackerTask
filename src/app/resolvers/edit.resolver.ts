import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ListService} from "../services/list.service";
import {Track} from "../interfaces/track";

@Injectable({
  providedIn: 'root'
})
export class EditResolver implements Resolve<Track | null> {
  constructor(private readonly listService: ListService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Track | null> {
    return this.listService.getUserTaskById(+route.params['id']);
  }
}
