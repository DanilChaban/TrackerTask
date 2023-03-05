import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { FilterPipe } from './pipe/filter.pipe';
import { ConfirmationModalComponent } from './modal/confirmation-modal.component';
import {MatIconModule} from "@angular/material/icon";
import { PostFormComponent } from './post-form/post-form.component';

@NgModule({
  declarations: [
    ListComponent,
    FilterPipe,
    ConfirmationModalComponent,
    PostFormComponent
  ],
    imports: [
        CommonModule,
        ListRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatIconModule
    ],
  providers: []
})
export class ListModule { }
