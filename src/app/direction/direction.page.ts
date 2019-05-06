import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SnapToArrayService } from '../func/snap-to-array.service'
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
declare var google;
@Component({
  selector: 'app-direction',
  templateUrl: './direction.page.html',
  styleUrls: ['./direction.page.scss'],
})
export class DirectionPage implements OnInit, AfterContentInit {
  map;
  @ViewChild('mapElement') mapElement;
  data;
  constructor(private geolocation: Geolocation,
    private func: SnapToArrayService,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private launchNavigator: LaunchNavigator,
    public loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.detail;
        console.log("data", this.data);

      }
    });
  }
  start= "";
  end= "";
  mode = 'DRIVING';
  loading;
  wangs;
  distance;
  duration;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  ngAfterContentInit(): void {
    
    this.initMap()
    
  }

  async ngOnInit(): Promise<void> {
    this.loading = await this.loadingController.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: { lat: 13.7500301, lng: 100.4890995 },
      mapTypeControl: false,
    });

    this.directionsDisplay.setMap(this.map);
    // this.directionsDisplay.setPanel(document.getElementById('right-panel'));
  }

  goTodirectionApp() {
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS
    }

    this.launchNavigator.navigate([this.data.lat, this.data.lng], options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }


  backhome() {
    this.router.navigate(['home']);
  }

  ionViewWillEnter() {
    this.loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadingController.dismiss().then(() => {

        this.start = resp.coords.latitude+","+resp.coords.longitude
        this.end = this.data.lat + ',' + this.data.lng
        this.calculateAndDisplayRoute();
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  calculateAndDisplayRoute() {

    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: this.mode
    }, (response, status) => {
      if (status === 'OK') {

        this.distance = response.routes[0].legs[0].distance.text
        this.duration = response.routes[0].legs[0].duration.text
        this.directionsDisplay.setDirections(response);
      } else {
        // this.presentAlert()
        // window.alert('Directions request failed due to ' + status)
        // const alert = this.alertController.create({
        //   title: 'Not Found!',
        //   subTitle: 'ไม่พบเส้นทาง',
        //   buttons: ['OK']
        // });
        // awit alert.present();


      }
    });
  }

}
