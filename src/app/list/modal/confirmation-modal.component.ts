import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  constructor() {
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.close.emit();
  }

  removeTrack(): void {
    this.remove.emit();
  }
}
