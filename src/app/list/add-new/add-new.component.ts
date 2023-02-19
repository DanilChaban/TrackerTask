import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {Track} from "../../interfaces/track";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  form = this.formBuilder.group({
    date: ['', Validators.required],
    hours: ['', [
      Validators.required,
      Validators.pattern("^(2[0-4]|1[0-9]|[1-9])$")
    ]],
    message: ['', Validators.required],
    done: false
  })
  constructor(private readonly formBuilder: FormBuilder,
              private readonly listService: ListService,
              private readonly router: Router) { }

  ngOnInit(): void {
  }


  addNew(): void {
    const data: Track = {
      date: this.form.get('date')?.getRawValue(),
      hours: this.form.get('hours')?.getRawValue(),
      message: this.form.get('message')?.getRawValue(),
      done: this.form.get('done')?.getRawValue()
    }
    this.listService.addNew(data).pipe(
      tap(() => {
        this.router.navigate(['/list'])
      })
    ).subscribe();
  }
}
