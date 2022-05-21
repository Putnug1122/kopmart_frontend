import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {}
  onSubmit() {
    this.userService.signUp(this.user).subscribe(
      (u) => {
        this.router.navigate(['/login']);
      },
      (e) => {}
    );
  }
}
