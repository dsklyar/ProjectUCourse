import { ChangeProfilePictureDialogComponent } from './changeProfilePictureDialog.component';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ChangeProfilePictureDialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<ChangeProfilePictureDialogComponent>;

        dialogRef = this.dialog.open(ChangeProfilePictureDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}