import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = true;

  constructor(private spinner: NgxSpinnerService, private router: Router) {
    let preloaderStatus = sessionStorage.getItem('preloader-status');
    if (preloaderStatus !== null) {
      this.loading = false;
    } else {
      const plstatus = "learnbuzz_preloader_loaded";
      router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
      });
      sessionStorage.setItem('preloader-status', plstatus);
    }
  }

  ngOnInit(): void {}

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }

    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }
  }

}
