import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enum/role';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isInvalid: boolean;
  isLogout: boolean;
  submitted = false;
  model: any = {
    username: '',
    password: '',
    remembered: false,
  };

  returnUrl = '/';
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    let params = this.route.snapshot.queryParamMap;
    this.isLogout = params.has('logout');
    this.returnUrl = params.get('returnUrl');
  }

  onSubmit() {
    this.submitted = true;
    this.userService.login(this.model).subscribe((user) => {
      if (user) {
        if (user.role != Role.Customer) {
          this.returnUrl = '/seller';
        }

        this.router.navigateByUrl(this.returnUrl);
        this.toast.success({
          detail: 'Success Message',
          summary: 'Login Successful',
          duration: 5000,
        });
      } else {
        this.isLogout = false;
        this.isInvalid = true;
      }
    });
  }

  fillLoginFields(u, p) {
    this.model.username = u;
    this.model.password = p;
    this.onSubmit();
  }
}
