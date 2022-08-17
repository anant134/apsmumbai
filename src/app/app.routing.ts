import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuradServiceService } from "./auth-gurad-service.service";
import { AuthenticationGuard } from "./authentication.guard";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { ForgetpasswordComponent } from "./views/forgetpassword/forgetpassword.component";
import { ResetpasswordComponent } from "./views/resetpassword/resetpassword.component";
import { RegisterComponent } from "./views/register/register.component";
import { SlotmasterComponent } from "./views/slotmaster/slotmaster.component";
import { CountrymasterComponent } from "./views/countrymaster/countrymaster.component";
import { HolidaymasterComponent } from "./views/holidaymaster/holidaymaster.component";
import { ProvincemasterComponent } from "./views/provincemaster/provincemaster.component";

import { BarangaymasterComponent } from "./views/barangaymaster/barangaymaster.component";
import { MuniciplalitymasterComponent } from "./views/municiplalitymaster/municiplalitymaster.component";
import { DevicemasterComponent } from "./views/devicemaster/devicemaster.component";

export const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "bookingmanage",
  //   // canActivate: [AuthenticationGuard],
  //   pathMatch: "full",
  //   canActivate: [AuthenticationGuard],
  //   children: [],
  // },
  {
    path: "",
    canActivate: [AuthenticationGuard],
    children: [],
    pathMatch: "full",
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "forgetpassword",
    component: ForgetpasswordComponent,
    data: {
      title: "Forget Password",
    },
  },
  {
    path: "resetPassword",
    component: ResetpasswordComponent,
    data: {
      title: "Reset Password",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page",
    },
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AuthenticationGuard],
    data: {
      title: "Home",
    },
    children: [
      {
        path: "bookingmanage",
        loadChildren: () =>
          import("./views/bookingmanagement/bookingmanagement.module").then(
            (m) => m.BookingManagementModule
          ),
      },
      {
        path: "slotmaster",
        component: SlotmasterComponent,
        data: {
          title: "Slot Master",
        },
      },
      {
        path: "countrymaster",
        component: CountrymasterComponent,
        data: {
          title: "Country Master",
        },
      },
      {
        path: "holidaymaster",
        component: HolidaymasterComponent,
        data: {
          title: "Holiday Master",
        },
      },
      {
        path: "provincemaster",
        component: ProvincemasterComponent,
        data: {
          title: "Province Master",
        },
      },

      {
        path: "barangaymaster",
        component: BarangaymasterComponent,
        data: {
          title: "Barangay Master",
        },
      },

      {
        path: "municiplalitymaster",
        component: MuniciplalitymasterComponent,
        data: {
          title: "Municiplality Master",
        },
      },
      {
        path: "devicemaster",
        component: DevicemasterComponent,
        data: {
          title: "Device Master",
        },
      },

      {
        path: "base",
        loadChildren: () =>
          import("./views/base/base.module").then((m) => m.BaseModule),
      },
      {
        path: "buttons",
        loadChildren: () =>
          import("./views/buttons/buttons.module").then((m) => m.ButtonsModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./views/chartjs/chartjs.module").then((m) => m.ChartJSModule),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./views/icons/icons.module").then((m) => m.IconsModule),
      },
      {
        path: "notifications",
        loadChildren: () =>
          import("./views/notifications/notifications.module").then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: "theme",
        loadChildren: () =>
          import("./views/theme/theme.module").then((m) => m.ThemeModule),
      },
      {
        path: "widgets",
        loadChildren: () =>
          import("./views/widgets/widgets.module").then((m) => m.WidgetsModule),
      },
    ],
  },
  { path: "**", component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      //relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
