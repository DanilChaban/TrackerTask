import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  trackId: number;
  form = this.formBuilder.group({
    date: ['', Validators.required],
    hours: ['', [
      Validators.required,
      Validators.pattern("^(2[0-4]|1[0-9]|[1-9])$")
    ]],
    message: ['', Validators.required],
    done: false
  })

  isShowConfirmDialog = false;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly listService: ListService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.data.pipe(tap(({track}) => {
      this.form.get('date')?.setValue(track.date)
      this.form.get('hours')?.setValue(track.hours)
      this.form.get('message')?.setValue(track.message)
      this.form.get('done')?.setValue(track.done)
      this.trackId = track.id;
    })).subscribe();
  }

  toggleRemoveModal(): void {
    this.isShowConfirmDialog = !this.isShowConfirmDialog;
  }

  updateTrack(): void {
    this.listService.updateTrackById(this.trackId, this.form.getRawValue()).pipe(
      tap(() => {
        this.router.navigate(['/list']);
      })
    ).subscribe();
  }

  removeTrack(): void {
    this.listService.removeTrack(this.trackId).pipe(
      tap(() => {
        this.router.navigate(['/list']);
      })
    ).subscribe();
  }
}
