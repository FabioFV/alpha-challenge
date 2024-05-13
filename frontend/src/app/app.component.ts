import { Component } from '@angular/core';
import { SessionService } from './_services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn = false;
  username?: string;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.isLoggedIn();
  }

  onLoggedIn(isUserLoggedIn: boolean) {
    this.isLoggedIn = isUserLoggedIn;
  }

}
