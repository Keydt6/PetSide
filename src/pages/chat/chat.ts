import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddChatPage} from "../add-chat/add-chat";
import {ChatDetailPage} from "../chat-detail/chat-detail";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  addChat() {
  	this.navCtrl.push(AddChatPage);
  }
  
  chatBy() {
      this.navCtrl.push(ChatDetailPage);
  }

}
