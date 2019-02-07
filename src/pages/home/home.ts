import {Component} from "@angular/core";
import {NavController, NavParams, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

//import { ToastService } from '/providers/util/toast.service';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
import {ChatPage} from "../chat/chat";
import {PerfilPage} from "../perfil/perfil";
import { PublicarPage } from "../publicar/publicar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  public search = {
    name: "Luis Gomez",
    date: new Date().toISOString()
  }


  following = false;
  user = {
    name: 'Paula Bolliger',
    profileImage: 'assets/img/avatar/girl-avatar.png',
    coverImage: 'assets/img/background/background-5.jpg',
    occupation: 'Designer',
    location: 'Seattle, WA',
    description: 'A wise man once said: The more you do something, the better you will become at it.',
    followers: 456,
    following: 1052,
    posts: 35
  };

  posts = [
    {
      postImageUrl: 'assets/img/me-adoptas.jpg',
      text: `Tu puedes derle una nueva oportunidad a una mascota abandonada, se parte de su mundo.`,
      date: 'Diciembre 13, 2018',
      likes: 12,
      comments: 4,
      timestamp: 'Hace 3h'
    },
    {
      postImageUrl: 'assets/img/maltrato-animal.jpg',
      text: '"Cualquiera que esté acostumbrado a menospreciar la vida de cualquier ser viviente está en peligro de menospreciar también la vida humana", Albert Schweitzer, premio Nobel de la Paz 1952. No permitamos el maltrato animal.',
      date: 'Diciembre 13, 2018',
      likes: 30,
      comments: 64,
      timestamp: 'Hace 6h'
    },
    {
      postImageUrl: 'assets/img/cachorros-adopcion.jpg',
      text: `Estos cachorros estan en adopcion para quien quiera darles un hogar.`,
      date: 'Diciembre 10, 2018',
      likes: 46,
      comments: 66,
      timestamp: '3d'
    },
  ];

  public User: any = [];
  constructor(
    private storage: Storage,
    public nav: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController) {

  }

  ionViewWillEnter() {
    // this.search.pickup = "Luis Gomez";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Luis Gomez"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }
 

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

  // to go chat page
  goToChat() {
    this.nav.push(ChatPage);
  }

  goToProfile(){
    this.nav.push(PerfilPage);
  }

  goToEditProfile(){
    
  }

  goToPublicar() {
    console.log('goToPublicar');
    this.nav.push(PublicarPage);
  }




/*
  //publicaciones
  ionViewDidLoad() {
    console.log('Hello ProfileFour Page');
  }

  follow() {
    this.following = !this.following;
    this.toastCtrl.create('Follow user clicked');
  }

  imageTapped(post) {
    this.toastCtrl.create('Post image clicked');
  }

  comment(post) {
    this.toastCtrl.create('Comments clicked');
  }

  like(post) {
    this.toastCtrl.create('Like clicked');
  }
*/
}

//
