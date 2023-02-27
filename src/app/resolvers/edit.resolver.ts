import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ListService} from "../services/list.service";
import {Track} from "../interfaces/track";

@Injectable({
  providedIn: 'root'
})
export class EditResolver implements Resolve<Track | null> {
  constructor(private readonly listService: ListService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Track | null> {
    const isAdmin = localStorage.getItem('user-key') === 'Admin';
    return this.listService.getUserTaskById(+route.params['id'], isAdmin);
  }
}
