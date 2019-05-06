import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
// import { SnapshotToArrayService } from '../func/snapshot-to-array.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
import * as firebase from 'firebase';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterContentInit {

  map;
  startlat;
  endlng;
  directionsDisplay = new google.maps.DirectionsRenderer;

  @ViewChild('map') mapElement;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  wangs: Array<any>;
  constructor(private geolocation: Geolocation, private router: Router) {

  }
  ngOnInit(): void {
    var Ref = firebase.database().ref("locations")
    Ref.once("value").then((snapshot) => {
      this.wangs = this.snapshotToArray(snapshot.val())
      this.initMap();
    }).catch()
  }

  ngAfterContentInit(): void {

  }
  snapshotToArray = snapshot => {
    let returnArr = [];
    Object.keys(snapshot).forEach(key => {

      snapshot[key].id = key

      returnArr.push(snapshot[key])
    })

    return returnArr;
  };

  detail(data) {
    
    let navigationExtras: NavigationExtras = {
      state: {
        detail: data
      }
    };
    this.router.navigate(['detail'], navigationExtras);
  }

  initMap() {

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 14,
      center: { lat: 13.7500301, lng: 100.4890995 },
      mapTypeControl: false,
    });
    // 13.7686261,100.5307118
    // 13.7684579,100.4974962
    // 13.7567687,100.5353664
    // 13.7678197,100.504413

    this.wangs.map((el, i) => {
      var lo = { lat: el.lat * 1, lng: el.lng * 1 }
      var marker = new google.maps.Marker({
        position: lo,
        map: this.map,
        title: el.name
      })

      this.addMark(marker, this.map, el)

    })

    this.location();
    // this.directionsDisplay.setMap(this.map);

  }

  location() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.geolocation.watchPosition().subscribe((data) => {
      this.startlat = data.coords.latitude * 1
      this.endlng = data.coords.longitude * 1
      var marker = new google.maps.Marker({
        position: { lat: this.startlat, lng: this.endlng },
        map: this.map,
        title: "You"
      })
      this.addMark(marker, this.map, '')
    });

  }

  addMark(marker, map, data) {
    let infowindow = new google.maps.InfoWindow({
      content: marker.title
    });
    marker.addListener('click', () => {
      infowindow.open(map, marker);
      if (data != '') {
        let navigationExtras: NavigationExtras = {
          state: {
            detail: data
          }
        };
        this.router.navigate(['detail'], navigationExtras);
      }

    });
  }
}
