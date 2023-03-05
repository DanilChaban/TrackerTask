import {Component, OnInit} from '@angular/core';
import {ListService} from "../services/list.service";
import {tap} from "rxjs";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  userName: string | null;
  search = '';
  posts: any = [];
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
        console.log(users, 'USERS')
        this.getAllTasksForAdmin();
      })
    ).subscribe();
  }

  getAllTasksForAdmin(): void {
    for (let user of this.users) {
      this.listService.getAllTasksForAdmin(user.id).pipe(
        tap (post => {
          this.posts.push(post.map((obj,) => {
            return { ...obj, userId: user.id};
            }));
        })
      ).subscribe();
    }
  }

  getUserName(userId: number | undefined): string {
    return this.users.find(user => user.id === userId)?.name || 'Unknown';
  }

  getCurrentUserTasks(): void {
      this.listService.getCurrentUserTasks().pipe(
        tap(post => {
          this.posts.push(post);
        })
      ).subscribe();
  }

  getRole(): void {
    this.userName = localStorage.getItem('user-key')!;
  }

  getFormattedHours(hours: number): string {
    return hours.toString().padStart(2) + 'h 00m';
  }
}
