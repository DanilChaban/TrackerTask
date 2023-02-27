import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, of, switchMap,} from "rxjs";
import {environment} from "../../environments/environment";
import {Track} from "../interfaces/track";
import {User} from "../interfaces/user";


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private readonly httpClient: HttpClient) {
  }

  addNew(newData: Track): Observable<void> {
    const url = environment.apiUrl + '/track';
    return this.httpClient.post<void>(url, newData);
  }

  getUsers(): Observable<User[]> {
    const url = environment.apiUrl + '/users';
    return this.httpClient.get<User[]>(url);
  }

  getAllTasksForAdmin(id: number | undefined): Observable<Track[]> {
    const url = environment.apiUrl + `/track/${id}`;
    return this.httpClient.get<Track[]>(url);
  }

  getCurrentUserTasks(): Observable<Track[]> {
    const url = environment.apiUrl + '/track';
    return this.httpClient.get<Track[]>(url);
  }

  getUserTaskById(id: number, isAdmin: boolean): Observable<Track | null> {
    if (isAdmin) {
      const taskQueries: Observable<Track[]>[] = [];
      return this.getUsers().pipe(
        switchMap(users => {
          for (let user of users) {
            taskQueries.push(this.getAllTasksForAdmin(user.id))
          }

          return forkJoin(taskQueries).pipe(
            switchMap(res => {
              let currentTask: Track | null = null;

              const mergedArray = res.flat(1)

              mergedArray.forEach(obj => {
                if (obj.id === id) {
                  currentTask = obj;
                }
              })

              return of(currentTask)
            })
          )
        })
      );

    } else {
      return this.getCurrentUserTasks().pipe(
        switchMap(res => {
          let currentTask: Track | null = null;
          res.forEach(obj => {
            if (obj.id === id) {
              currentTask = obj;
            }
          })
          return of(currentTask);
        })
      )

    }
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
