import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './shared/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule,HttpClientModule,ShareModule,ReactiveFormsModule,DashboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
