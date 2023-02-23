import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {catchError, Subject, takeUntil, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
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
              private readonly router: Router) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.unsubscribe();
  }

  onSubmit(): void {
    this.authService.register(this.form.getRawValue()).pipe(
      tap(() => {
        this.router.navigate(['/auth/sign-in']);
      }),
      takeUntil(this.notifier),
      catchError(error => {
        this.error = error;
        return throwError(error);
      })
    ).subscribe();
  }

}
