import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CalendarModule } from "primeng/calendar";
import { TabViewModule } from "primeng/tabview";
import { HttpClientModule } from "@angular/common/http";
import { DialogModule } from "primeng/dialog";

import { AuthGuradServiceService } from "./auth-gurad-service.service";

import {
  IconModule,
  IconSetModule,
  IconSetService,
} from "@coreui/icons-angular";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";

import { RegisterComponent } from "./views/register/register.component";
import { ToastModule } from "primeng/toast";
const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { ModalModule } from "ngx-bootstrap/modal";
import { SlotmasterComponent } from "./views/slotmaster/slotmaster.component";
import { HolidaymasterComponent } from "./views/holidaymaster/holidaymaster.component";
import { CountrymasterComponent } from "./views/countrymaster/countrymaster.component";
import { TableModule } from "primeng/table";
import { ProvincemasterComponent } from "./views/provincemaster/provincemaster.component";
import { MuniciplalitymasterComponent } from "./views/municiplalitymaster/municiplalitymaster.component";
import { BarangaymasterComponent } from "./views/barangaymaster/barangaymaster.component";
import { DevicemasterComponent } from "./views/devicemaster/devicemaster.component";
import { ForgetpasswordComponent } from "./views/forgetpassword/forgetpassword.component";
import { ResetpasswordComponent } from './views/resetpassword/resetpassword.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    InputTextModule,
    DialogModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    TableModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    SlotmasterComponent,
    HolidaymasterComponent,
    CountrymasterComponent,
    ProvincemasterComponent,
    MuniciplalitymasterComponent,
    BarangaymasterComponent,
    DevicemasterComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
  ],
  providers: [
    {
      provide: [LocationStrategy, AuthGuradServiceService],
      useClass: HashLocationStrategy,
    },
    IconSetService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
