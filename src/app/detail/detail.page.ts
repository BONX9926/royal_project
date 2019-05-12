import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  data;
  constructor(private route: ActivatedRoute, private router: Router,private photoViewer: PhotoViewer) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.detail;
      }
    });
  }

  ngOnInit() {
  }

  goTodirection() {
    let navigationExtras: NavigationExtras = {
      state: {
        detail: this.data
      }
    };
    this.router.navigate(['direction'], navigationExtras);
  }

  showImg(img) {
    this.photoViewer.show(img)
  }

  readmore() {
    let navigationExtras: NavigationExtras = {
      state: {
        detail: this.data
      }
    };
    this.router.navigate(['more'], navigationExtras);
  }

}
