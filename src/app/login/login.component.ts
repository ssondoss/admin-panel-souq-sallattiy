import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {
    if (localStorage.getItem('adminIsLoggedIn') != null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  login(username: string, password: string) {
    if (
      username.toLocaleLowerCase() == 'admin_001' &&
      password == 'Admin_001'
    ) {
      localStorage.setItem('adminIsLoggedIn', 'true');
      this.router.navigate(['/']);
    } else {
      alert('خطأ في اسم المستخدم او كلمة السر');
    }
  }
}
