import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Role } from './../../enum/role';
import { JwtResponse } from './../../response/jwt-response';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  currentUserSubscription: Subscription;
  name$;
  name: string;
  currentUser: JwtResponse;
  root = '/';
  Role = Role;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.name$ = this.userService.name$.subscribe(
      (aName) => (this.name = aName)
    );
    this.currentUserSubscription = this.userService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
        if (!user || user.role == Role.Customer) {
          this.root = '/';
        } else {
          this.root = '/seller';
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    // this.name$.unsubscribe();
  }

  logout() {
    this.userService.logout();
    // this.router.navigate(['/login'], {queryParams: {logout: 'true'}} );
  }
}
