import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";
import {Track} from "../../interfaces/track";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  providers: [
  ]
})
export class PostFormComponent implements OnInit {
  form = this.formBuilder.group({
    date: ['', Validators.required],
    hours: [ '', [
      Validators.required,
      Validators.pattern("^(2[0-4]|1[0-9]|[1-9])$")
    ]],
    message: ['', Validators.required],
    done: false
  })
  trackId: number;
  isShowConfirmDialog = false;
  isNew = true;
  constructor(private readonly formBuilder: FormBuilder,
              private readonly listService: ListService,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(tap(({track}) => {
        this.form.get('date')?.setValue(track.date);
        const hours = this.form.get('hours')?.setValue(track.hours);
        this.form.get('message')?.setValue(track.message);
        this.form.get('done')?.setValue(track.done);

        this.isNew = false;
        this.trackId = track.id;
    })).subscribe();
  }

  toggleRemoveModal(): void {
    this.isShowConfirmDialog = !this.isShowConfirmDialog;
  }

  addNew(): void {
    if (this.isNew) {
      const data: Track = {
        date: this.form.get('date')?.getRawValue(),
        hours: this.form.get('hours')?.getRawValue(),
        message: this.form.get('message')?.getRawValue(),
        done: this.form.get('done')?.getRawValue()
      }
      this.listService.addNew(data).pipe(
        tap(() => {
          this.router.navigate(['/list']);
        })
      ).subscribe();
    } else {
      this.listService.updateTrackById(this.trackId, this.form.getRawValue()).pipe(
        tap(() => {
          this.router.navigate(['/list']);
        })
      ).subscribe();
    }
  }

  removeTrack(): void {
    this.listService.removeTrack(this.trackId).pipe(
      tap(() => {
        this.router.navigate(['/list']);
      })
    ).subscribe();
  }

}
