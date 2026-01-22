import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
})
export class ConfirmDeleteDialogComponent {
  /**
   * Controls dialog visibility
   */
  @Input() visible = false;

  /**
   * Emits when user confirms delete
   */
  @Output() deleteConfirmed = new EventEmitter<void>();

  /**
   * Close dialog without action
   */
  close(): void {
    this.visible = false;
  }

  /**
   * Confirm delete action
   */
  confirm(): void {
    this.deleteConfirmed.emit();
    this.visible = false;
  }
}
