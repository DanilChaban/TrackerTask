import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  minPw = 6;
  maxPw = 11;
  error = '';
  form = this.formBuilder.group({
    name: [''],
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

  onSubmit(): void {
    this.authService.register(this.form.getRawValue()).pipe(
      tap(() => {

        this.router.navigate(['']);
      }),
      catchError(error => {
        this.error = error;
        return throwError(error);
      })
    ).subscribe();
  }

}
