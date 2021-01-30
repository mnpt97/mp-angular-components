import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MpHomeComponent } from "./mp-home/mp-home.component";
/*const routes: Routes = [
  {path: '', data: {label: 'Home'}},
  {path: 'path1', data: {label: 'Path1'}},
  {path: 'path1/path1_1', data: {label : 'Path1_1'}}

];*/

const routes : Routes = [
  {path: '', component : MpHomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MpRoutingModule{ }
