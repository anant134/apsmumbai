import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";

import { BookingManagementComponent } from "./bookingmanagement.component";
import { BookingManagementRoutingModule } from "./bookingmanagement-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CalendarModule } from "primeng/calendar";
import { AccordionModule } from "primeng/accordion";
@NgModule({
  imports: [
    BookingManagementRoutingModule,
    ChartsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    AccordionModule,
  ],
  declarations: [BookingManagementComponent],
})
export class BookingManagementModule {}
