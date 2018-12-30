
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})

export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit() {
  }

  redirect(pagename) {
    this.router.navigate([pagename]);
    console.log(pagename)
  }
}
