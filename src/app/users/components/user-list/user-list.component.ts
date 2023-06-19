import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users$: Observable<User[]>;

  constructor(private userService: UserService) {
    this.users$ = this.userService.getAllUsers();

    //this.users$.pipe(tap((users) => console.log(users))); //.subscribe();

    // this.userService
    //   .getAllUsers()
    //   .pipe(tap((users) => console.log(users)))
    //   .subscribe();
  }
}
