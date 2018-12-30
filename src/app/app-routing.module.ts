import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.service';
import { HistoryComponent } from './components/history/history.component';
import { LimitsComponent } from './components/limits/limits.component';
import { RemitComponent } from './components/remit/remit.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: RemitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'remit-history',
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'remit-limits',
    component: LimitsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'remit-create',
    component: RemitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
