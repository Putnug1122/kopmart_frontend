import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enum/role';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  user = new User();
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
