import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsStore } from '../../../products/store/productsStore';
import { SignInParams } from '../../models/user';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatButton, MatDialogClose, MatFormFieldModule, MatIconModule, MatInput, ReactiveFormsModule],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss'
})
export class SignInDialogComponent {
  fb = inject(NonNullableFormBuilder);
  store = inject(ProductsStore);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  dialog = inject(MatDialog);

  signInForm = this.fb.group({
    email: ['example@test.com', Validators.required],
    password: ['test1234', Validators.required]
  })

  passwordVisible = signal(false);

  togglePasswordVisibility() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signInForm.value;

    this.store.signIn({ email, password, checkout: this.data.checkout, dialogId: this.dialogRef.id } as SignInParams);

  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.dialog.open(SignUpDialogComponent, {
      disableClose: true,
      data: {
        checkout: this.data.checkout
      }
    })
  }

}
