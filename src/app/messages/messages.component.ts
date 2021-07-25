import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss', '../app.component.scss'],
})
export class MessagesComponent implements OnInit {
  orders: any;
  allMassages: any;
  constructor(router: Router, private http: HttpClient) {
    if (localStorage.getItem('adminIsLoggedIn') == null) {
      router.navigate(['/login']);
    }
    this.getAllMassages();
  }

  getAllMassages() {
    this.http.get(environment.api + 'contact-message').subscribe((res: any) => {
      this.allMassages = res;
    });
  }

  delete(id: string) {
    this.http
      .delete(environment.api + 'contact-message/' + id)
      .subscribe(() => {
        this.getAllMassages();
      });
  }
  ngOnInit(): void {}
}
