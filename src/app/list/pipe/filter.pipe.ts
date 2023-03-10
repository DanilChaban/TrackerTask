import { Pipe, PipeTransform } from '@angular/core';
import {Track} from "../../interfaces/track";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: [Track[]], search: string): Track[][] {
    if (!search.trim()) {
      return posts;
    }

    return posts.map(post => {
      return post.filter(track => track.message.toLowerCase().includes(search.toLowerCase()))
    })
  }
}
