import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tsa' , pathMatch: 'full'},
  { path: 'tsa', loadChildren: () => import('./train-seat-availability/tsa.module').then(m => m.tsaModule), data: { id: 'navtsa' } },
  { path: '**', redirectTo: 'tsa' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
