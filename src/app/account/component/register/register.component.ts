import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountService } from '../services/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    occupation: ['', Validators.required],
  });
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.form.valueChanges.subscribe((value) => console.log(value));

    this.f.password.valueChanges.subscribe((value) => console.log(value));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/login'], { relativeTo: this.route });
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}
