import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, switchMap} from "rxjs";
import {environment} from "../../environments/environment";
import {Track} from "../interfaces/track";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private readonly httpClient: HttpClient) { }


  addNew(newData: Track): Observable<void> {
    const url = environment.apiUrl + '/track';
    return this.httpClient.post<void>(url, newData);
  }

  getCurrentUserTasks(): Observable<Track[]> {
    const url = environment.apiUrl + '/track';
    return this.httpClient.get<Track[]>(url);
  }

  getUserTaskById(id: number): Observable<Track | null> {
    return this.getCurrentUserTasks().pipe(
      switchMap(res => {
        let currentTask: Track | null = null
        res.forEach(obj => {
          if (obj.id === id) {
            currentTask = obj;
          }
        })
        return of(currentTask)
      })
    )
  }
  updateTrackById(id: number, data: any): Observable<Track> {
    const url = environment.apiUrl + `/track/${id}`;
    return this.httpClient.patch<Track>(url, data);
  }
  removeTrack(id: number): Observable<Track> {
    const url = environment.apiUrl + `/track/${id}`;
    return this.httpClient.delete<Track>(url)
  }
}
