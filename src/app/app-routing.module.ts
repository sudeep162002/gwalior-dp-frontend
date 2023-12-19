import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from './components/error/error.component'
import {LandingPageComponent} from './components/landing-page/landing-page.component'
import {AddNewComponent} from './components/add-new/add-new.component'

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  // {
  //   path: 'add-new',
  //   loadChildren: () => import('./views/admin-view/admin-view.module').then(m => m.AdminViewModule),
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'add-new',
    component: AddNewComponent
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
