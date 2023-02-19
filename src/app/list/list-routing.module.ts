import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list.component";
import {AddNewComponent} from "./add-new/add-new.component";
import {EditComponent} from "./edit/edit.component";
import {EditResolver} from "../resolvers/edit.resolver";

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'add-new', component: AddNewComponent},
  {path: 'edit/:id', component: EditComponent, resolve: {track: EditResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
