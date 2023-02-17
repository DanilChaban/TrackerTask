import {Component, OnInit} from '@angular/core';
import {ListService} from "../services/list.service";
import {tap} from "rxjs";
import {Track} from "../interfaces/track";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  userName: string;
  search = '';
  posts: Track[] = [];
  constructor(private readonly listService: ListService) {
  }

  ngOnInit(): void {
    this.getCurrentUserTasks();
    this.getRole();
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
