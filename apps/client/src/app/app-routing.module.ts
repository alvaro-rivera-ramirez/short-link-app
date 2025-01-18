import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { privateGuard} from './public/guards/private.guard';
import { publicGuard } from './public/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[publicGuard],
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'dashboard',
    canActivate: [privateGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
