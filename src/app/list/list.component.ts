import {Component, OnInit} from '@angular/core';
import {ListService} from "../services/list.service";
import {tap} from "rxjs";
import {Track} from "../interfaces/track";
import {User} from "../interfaces/user";
import {Users} from "../interfaces/users";

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
    this.getCurrentUserTasks();
    this.getUsers();
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
        tap(post => {
          this.posts = post;
        })
      ).subscribe();
    }
  }

  getCurrentUserTasks(): void {
      this.listService.getCurrentUserTasks().pipe(
        tap(post => {
          this.posts = post;
        })
      ).subscribe();
  }

  getRole(): void {
    this.userName = localStorage.getItem('user-key')!;
  }
}
