import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';

// import {SearchCarsPage} from "../search-cars/search-cars";

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {
  public fromto: any;
  // places
  public places = {
    nearby: [
      {
        id: 1,
        name: "Petra Cordova"
      },
      {
        id: 2,
        name: "Argenis Gomez"
      },
      {
        id: 3,
        name: "Keyvin Diaz"
      },
      {
        id: 4,
        name: "Luis Gomez"
      },
      {
        id: 5,
        name: "Hermes Soto"
      },
      {
        id: 6,
        name: "Jose Jose"
      }
    ],
    recent: [
      {
        id: 1,
        name: "Luis Gomez"
      }
    ]
  };

  constructor(private storage: Storage, public nav: NavController, public navParams: NavParams) {
    this.fromto = this.navParams.data;
  }

  // search by item
  searchBy(item) {
    if (this.fromto === 'from') {
      this.storage.set('pickup', item.name);
    }

    if (this.fromto === 'to') {
      this.storage.set('dropOff', item.name);
    }
    // this.nav.push(SearchCarsPage);
    this.nav.pop();
  }
}
