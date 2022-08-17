import { Component } from "@angular/core";
import { navItems } from "../../_nav";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { AuthGuradServiceService } from "./../../auth-gurad-service.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public userSessionInfo: any;
  constructor(
    private router: Router,
    private location: Location,
    private Authguardservice: AuthGuradServiceService
  ) {}

  ngOnInit() {
    // debugger;
    this.navItems = [
      {
        name: "Manage Booking",
        url: "/bookingmanage",
        icon: "icon-calculator",
      },
    ];
    if (!this.Authguardservice.gettoken()) {
      this.router.navigateByUrl("/login");
    } else {
      this.userSessionInfo =
        sessionStorage.length > 0
          ? JSON.parse(sessionStorage.getItem("userdata"))
          : [];

      //if admin show all
      console.log();
      debugger;
      if (
        this.userSessionInfo[0].isSuperAdmin == "1" ||
        this.userSessionInfo[0].isAdmin == "1"
      ) {
        this.navItems.push(
          {
            name: "Slot Master",
            url: "/slotmaster",
            icon: "icon-calculator",
          },
          {
            name: "Country Master",
            url: "/countrymaster",
            icon: "icon-calculator",
          },
          {
            name: "Municiplality Master",
            url: "municiplalitymaster",
            icon: "icon-calculator",
          },
          {
            name: "Barangay Master",
            url: "barangaymaster",
            icon: "icon-calculator",
          },
          {
            name: "Province Master",
            url: "/provincemaster",
            icon: "icon-calculator",
          },
          {
            name: "Holiday Master",
            url: "/holidaymaster",
            icon: "icon-calculator",
          },
          {
            name: "Device Master",
            url: "/devicemaster",
            icon: "icon-calculator",
          },
          {
            name: "Report",
            url: "",
            icon: "",
          }
        );
      } else {
      }
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  LogoutUser() {
    //debugger;
    sessionStorage.removeItem("userdata");
    this.location.replaceState("/"); // clears browser history so they can't navigate with back button
    // this.router.navigate(["login"]);
  }
}
