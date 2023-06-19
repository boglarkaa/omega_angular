import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Stuff } from '../../models/stuff.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.css'],
})
export class StuffListComponent {
  myStuffs$: Observable<Stuff[]>;

  constructor(private userService: UserService) {
    this.myStuffs$ = this.userService.getMyStuff();
  }
}
