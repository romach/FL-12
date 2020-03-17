import { PipeTransform, Pipe } from "@angular/core";
import { User } from './user/user.model';

@Pipe({ name: "search" })
export class SearchPipe implements PipeTransform {
  transform(users: User[], searchQuery: string) {
    const normalize = (line: string) => line.trim().toLowerCase()
    return users.filter(
      user => normalize(searchQuery) === "" ||
        normalize(user.name).includes(normalize(searchQuery)) ||
        normalize(user.email).includes(normalize(searchQuery))
    );
  }
}