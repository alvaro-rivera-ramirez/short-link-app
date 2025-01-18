import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './public/services/auth.service';
import { AuthStatus } from './public/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  authService=inject(AuthService)
  private router = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    console.log("en el guard principal")
    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;
  });


  public authStatusChangedEffect = effect(() => {
    console.log("en el guard principal effect")

    switch( this.authService.authStatus() ) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.navigateUrl();
        return;

      case AuthStatus.notAuthenticated:
        return;

    }
  });

  async navigateUrl(){
    console.log(window.location.pathname);
    const urlPrev=localStorage.getItem("url")??"/dashboard";
    await this.router.navigateByUrl(window.location.pathname);
    return;
  }
}
