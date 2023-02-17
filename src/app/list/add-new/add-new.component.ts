import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {Track} from "../../interfaces/track";

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
      Validators.pattern("[1-24]+")
    ]],
    message: ['', Validators.required],
    done: false
  })
  constructor(private readonly formBuilder: FormBuilder,
              private readonly listService: ListService) { }

  ngOnInit(): void {
  }


  addNew(): void {
    const data: Track = {
      date: this.form.get('date')?.getRawValue(),
      hours: this.form.get('hours')?.getRawValue(),
      message: this.form.get('message')?.getRawValue(),
      done: this.form.get('done')?.getRawValue()
    }
    this.listService.addNew(data).subscribe();
  }
}
