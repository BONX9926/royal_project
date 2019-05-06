import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnapToArrayService {

  constructor() { }
  snapshotToArray = snapshot => {
    let returnArr = [];
    Object.keys(snapshot).forEach(key => {

      snapshot[key].id = key

      returnArr.push(snapshot[key])
    })

    return returnArr;
  };
}
