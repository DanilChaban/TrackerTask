import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {catchError, Subject, takeUntil, tap, throwError} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  notifier: Subject<boolean> = new Subject<boolean>();
  error = '';
  form = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private readonly formBuilder: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken !== null) {
      this.authService.setToken(potentialToken)
    }
  }

  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.unsubscribe();
  }

  onSubmit(): void {
    this.authService.login(this.form.getRawValue()).pipe(
      tap(() => {
        localStorage.setItem('user-key', this.form.get('name')?.value!)
        this.router.navigate(['/list'])
      }),
      takeUntil(this.notifier),
      catchError(error => {
        this.error = error;
        return throwError(error)
      })
    ).subscribe();
  }
}
