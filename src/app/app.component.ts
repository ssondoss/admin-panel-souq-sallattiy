import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'new-sallattiy-admin';
  currentComponent: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentComponent = window.location.href.split('/').pop();
  }
}
