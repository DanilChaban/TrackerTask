import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list.component";
import {AddNewComponent} from "./add-new/add-new.component";
import {EditComponent} from "./edit/edit.component";
import {EditResolver} from "../resolvers/edit.resolver";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'list/add-new', component: AddNewComponent},
  {path: 'list/edit/:id', component: EditComponent, resolve: {track: EditResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
