import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import {PerfilPage} from "../pages/perfil/perfil";
import {NotificationsPage} from "../pages/notifications/notifications";
import {ChatPage} from "../pages/chat/chat";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {SettingsPage} from "../pages/settings/settings";
import { LoginPage } from "../pages/login/login";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Inicio', component: HomePage, icon: 'home'},
      {title: 'Perfil', component: PerfilPage, icon: 'person'},
      {title: 'Notificaciones', component: NotificationsPage, icon: 'notifications'},
      {title: 'Chat', component: ChatPage, icon: 'chatbubbles'},
      {title: 'Buscar', component: ChatPage, icon: 'search'},
      {title: 'Configuraciones', component: SettingsPage, icon: 'settings'}
    ];
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  logout() {
    this.nav.setRoot(LoginPage);
  }

}
