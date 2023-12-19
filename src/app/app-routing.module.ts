import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from './components/error/error.component'
import {LandingPageComponent} from './components/landing-page/landing-page.component'

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./views/admin-view/admin-view.module').then(m => m.AdminViewModule),
  //   canActivate: [AuthGuardService]
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
