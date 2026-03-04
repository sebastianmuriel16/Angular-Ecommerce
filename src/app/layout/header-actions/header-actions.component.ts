import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { ProductsStore } from '../../features/products/store/productsStore';
import { MatMenuModule } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { SignInDialogComponent } from '../../features/user/components/sign-in-dialog/sign-in-dialog.component';
import { SignUpDialogComponent } from '../../features/user/components/sign-up-dialog/sign-up-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header-actions',
  imports: [MatButtonModule, MatIconModule, RouterLink, MatBadge, MatMenuModule, MatDivider],
  templateUrl: './header-actions.component.html',
  styleUrl: './header-actions.component.scss'
})
export class HeaderActionsComponent {

  store = inject(ProductsStore);
  dialog = inject(MatDialog);

  openSignInDialog() {
    this.dialog.open(SignInDialogComponent, {
      disableClose: true,
      data: {
        checkout: false
      }
    })
  }

  openSignUpDialog() {
    this.dialog.open(SignUpDialogComponent, {
      disableClose: true,
      data: {
        checkout: false
      }
    })
  }

}
