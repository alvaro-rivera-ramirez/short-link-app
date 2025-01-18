import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LinkComponent } from './pages/link/link.component';
import { UrlCardComponent } from './components/url-card/url-card.component';
import { UrlCardListComponent } from './components/url-card-list/url-card-list.component';
import { ShareModule } from '../shared/share.module';



@NgModule({
  declarations: [
    HomeComponent,
    UserLayoutComponent,
    LinkComponent,
    UrlCardComponent,
    UrlCardListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    ShareModule
  ]
})
export class DashboardModule { }
