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
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
import moment from 'moment';

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

  public User: any = [];
  public listPosts: any;
  constructor(
    private storage: Storage,
    public nav: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public publProvider: PublicacionProvider) {

    this.listPosts = [];
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Luis Gomez"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });

    this.publProvider.getpublications()
    .subscribe(publicaciones => {
      publicaciones = publicaciones.json();
      this.listPosts = publicaciones.publications;
      console.log(this.listPosts);
      for(let p of this.listPosts) {
        p['dateMoment'] = moment(p.creationDate).startOf('minute').fromNow();
      }
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
    this.nav.push(PerfilPage, {}, {animate: true, direction: 'forward'});
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
