import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  error = '';
  form = this.formBuilder.group({
    name: [''],
    password: ['']
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

  onSubmit(): void {
    this.authService.login(this.form.getRawValue()).pipe(
      tap(() => {
        localStorage.setItem('user-key', this.form.get('name')?.value!)
        this.router.navigate(['/list'])
      }),
      catchError(error => {
        this.error = error;
        return throwError(error)
      })
    ).subscribe();
  }
}
