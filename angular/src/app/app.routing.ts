import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/Home/home.component';
import { AboutComponent } from './pages/About/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

export const routing = RouterModule.forRoot(routes);
