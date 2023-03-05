import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {catchError, Subject, takeUntil, tap, throwError} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isRegistering = false;
  notifier: Subject<void> = new Subject<void>();
  minPw = 6;
  maxPw = 11;
  error = '';
  form = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(this.minPw),
      Validators.maxLength(this.maxPw)
    ]]
  })
  constructor(private readonly formBuilder: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.unsubscribe();
  }

  onSubmit(): void {
    if (this.isRegistering) {
      this.authService.register(this.form.getRawValue()).pipe(
        tap(() => {
          this.toggleRegistering();
        }),
        takeUntil(this.notifier),
        catchError(error => {
          this.error = error;
          return throwError(error);
        })
      ).subscribe();
    } else {
      this.authService.login(this.form.getRawValue()).pipe(
        tap(() => {
          this.router.navigate(['/list']);
          localStorage.setItem('user-key', this.form.get('name')?.value!);
        }),
        takeUntil(this.notifier),
        catchError(error => {
          this.error = error;
          return throwError(error);
        })
      ).subscribe();
    }
  }
  toggleRegistering(): void {
    this.isRegistering = !this.isRegistering;
  }
}
