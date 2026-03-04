import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductsStore } from '../../../products/store/productsStore';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { SingUpParams } from '../../models/user';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';



@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInput, MatButtonModule, MatDialogClose],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss'
})
export class SignUpDialogComponent {
  fb = inject(NonNullableFormBuilder)
  dialog = inject(MatDialog)
  dialogRef = inject(MatDialogRef)
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA)
  store = inject(ProductsStore)

  signUpForm = this.fb.group({
    name: ['test', Validators.required],
    email: ['example@test.com', Validators.required],
    password: ['test1234', Validators.required],
    confirmPassword: ['test1234', Validators.required]
  })

  singUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return
    }

    const { email, password } = this.signUpForm.value

    this.store.signUp({ email, password, dialogId: this.dialogRef.id, checkout: this.data.checkout } as SingUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.dialog.open(SignInDialogComponent, {
      disableClose: true,
      data: {
        checkout: this.data.checkout
      }
    })
  }
}
