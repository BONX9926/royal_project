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
  wangs: Array<any>;
  constructor(private geolocation: Geolocation, private router: Router) {

  }
  ngOnInit(): void {
    var Ref = firebase.database().ref("locations")
    Ref.once("value").then((snapshot) => {
      this.wangs = this.snapshotToArray(snapshot.val())
      console.log(this.wangs);
      
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

 
}
