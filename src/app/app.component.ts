import { Component, inject } from '@angular/core';

import { AccountService } from './account/component/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'summer-practice-2023-frontend';

  accountService = inject(AccountService);

  logout() {
    this.accountService.logout();
  }
}
