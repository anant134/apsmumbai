import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BookingManagementComponent } from "./bookingmanagement.component";

const routes: Routes = [
  {
    path: "",
    component: BookingManagementComponent,
    data: {
      title: "Manage Booking",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingManagementRoutingModule {}
