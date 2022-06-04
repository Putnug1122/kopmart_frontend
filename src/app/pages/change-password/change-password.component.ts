import { User } from './../../models/user';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enum/role';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user = new User();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const account = this.userService.currentUserValue.account;

    this.userService.get(account).subscribe(
      (u) => {
        this.user = u;
        this.user.password = '';
      },
      (e) => {}
    );
  }

  onSubmit() {
    this.userService.update(this.user).subscribe(
      (u) => {
        this.userService.nameTerms.next(u.name);
        let url = '/';
        if (this.user.role != Role.Customer) {
          url = '/seller';
        }
        this.router.navigateByUrl(url);
      },
      (_) => {}
    );
  }

  logout() {
    this.userService.logout();
  }
}
