import {Component, OnInit} from '@angular/core';
import {ListService} from "../services/list.service";
import {tap} from "rxjs";
import {Track} from "../interfaces/track";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  userName: string;
  search = '';
  posts: Track[] = [];
  users: User[];
  constructor(private readonly listService: ListService) { }

  ngOnInit(): void {
    this.getRole();
    if (this.userName === 'Admin') {
      return this.getUsers()
    } else {
      return this.getCurrentUserTasks();
    }
  }

  getUsers(): void {
    this.listService.getUsers().pipe(
      tap(users => {
        this.users = users;
        this.getAllTasksForAdmin();
      })
    ).subscribe();
  }

  getAllTasksForAdmin(): void {
    for (let user of this.users) {
      this.listService.getAllTasksForAdmin(user.id).pipe(
        tap (post => {
          console.log(post, 'adminPost')
          this.posts = this.posts.concat(post.map((obj, index) => {
            if (index === 0) {
              return {...obj, userName: user.name};
            }

            return obj;
          }))
        })
      ).subscribe();
    }
  }

  getCurrentUserTasks(): void {
      this.listService.getCurrentUserTasks().pipe(
        tap(post => {
          this.posts = post;
          console.log(post, 'userPost');
        })
      ).subscribe();
  }

  getRole(): void {
    this.userName = localStorage.getItem('user-key')!;
  }
}
