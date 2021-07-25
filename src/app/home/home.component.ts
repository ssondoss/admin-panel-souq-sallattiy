import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../app.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(router: Router) {
    if (localStorage.getItem('adminIsLoggedIn') == null) {
      router.navigate(['/login']);
    }
  }
  ngOnInit(): void {}
}
