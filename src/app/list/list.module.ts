import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AddNewComponent } from './add-new/add-new.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { FilterPipe } from './pipe/filter.pipe';
import { EditComponent } from './edit/edit.component';
import { ConfirmationModalComponent } from './modal/confirmation-modal.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    ListComponent,
    AddNewComponent,
    FilterPipe,
    EditComponent,
    ConfirmationModalComponent,
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
    ]
})
export class ListModule { }
