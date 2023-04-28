import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayotAuthComponent } from './shared/components/layot-auth/layot-auth.component';
import { LayotBlankComponent } from './shared/components/layot-blank/layot-blank.component';
import { AuthGuard, AuthGuard2 } from './shared/guards/auth.guard';
import { NotfoundModule } from './Components/notfound/notfound.module';

const routes: Routes = [
  // LazyLoading Public Routing For Blank Pag
  {
    path: '',
    component: LayotBlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Components/home/home.module').then((m) => m.HomeModule),
        title: 'Home',
      },
      {
        path: 'games',
        loadChildren: () =>
          import('./Components/games/games.module').then((m) => m.GamesModule),
        title: 'Games',
      },
      {
        path: 'games/:category',
        loadChildren: () =>
          import('./Components/games/games.module').then((m) => m.GamesModule),
        title: 'Games',
      },
      {
        path: 'browser',
        loadChildren: () =>
          import('./Components/browser/browser.module').then((m) => m.BrowserModule),
        title: 'Browser',
      },
      {
        path: 'browser/:category',
        loadChildren: () =>
          import('./Components/browser/browser.module').then((m) => m.BrowserModule),
        title: 'Browser',
      },
      {
        path: 'details/:id',
        loadChildren: () =>
          import('./Components/details/details.module').then((m) => m.DetailsModule),
        title: 'Details',
      },
    ],
  },

  // LazyLoading Routing For Autho
  {
    path: 'auth',
    canActivate: [AuthGuard2],
    component: LayotAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Components/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  // Not Found Page
  { path: '**', loadChildren: () => NotfoundModule, title: 'NotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
