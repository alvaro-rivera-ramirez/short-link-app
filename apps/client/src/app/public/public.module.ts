import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { PublicRoutingModule } from './public-routing.module';
import {SharedPublicModule} from './shared/shared-public.module';
import { PublicLayoutComponent } from './public-layout.component';
import { CoverComponent } from './components/cover/cover.component';
import { ShareModule } from '../shared/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages';

@NgModule({
  declarations: [
    HomeComponent,
    PublicLayoutComponent,
    CoverComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedPublicModule,
    PublicRoutingModule,
    ShareModule,
    ReactiveFormsModule
  ],
})
export class PublicModule { }
