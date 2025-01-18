import { NgModule } from '@angular/core';

import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { LinkComponent } from './pages/link/link.component';

const routes: Routes = [
  {
    path: '',
    component:UserLayoutComponent,
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'links',
        component:LinkComponent
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class DashboardRoutingModule {}
