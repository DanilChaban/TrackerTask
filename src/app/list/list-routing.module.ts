import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list.component";
import {EditResolver} from "../resolvers/edit.resolver";
import {PostFormComponent} from "./post-form/post-form.component";


const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'post-form/:id', component: PostFormComponent, resolve: {track: EditResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
