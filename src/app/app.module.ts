import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {IonicStorageModule} from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
//import { CameraPreview } from '@ionic-native/camera-preview';

import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";

import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import {LocalWeatherPage} from "../pages/local-weather/local-weather";
//<<<<<<< HEAD
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
//=======
import {AddChatPage} from "../pages/add-chat/add-chat";
import {ChatPage} from "../pages/chat/chat";
import {ChatDetailPage} from "../pages/chat-detail/chat-detail";
//>>>>>>> 63d08064d8665d842ebf70e117d07884e6c1c719
import {PerfilPage} from "../pages/perfil/perfil";
import { UserProvider } from '../providers/user/user';
import { PublicacionProvider } from '../providers/publicacion/publicacion';
import { PublicarPage } from '../pages/publicar/publicar';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    AddChatPage,
    CheckoutTripPage,
    ChatPage,
    ChatDetailPage,
    HomePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    EditProfilePage,
    PerfilPage,
    PublicarPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    AddChatPage,
    CheckoutTripPage,
    ChatPage,
    ChatDetailPage,
    HomePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    EditProfilePage,
    PerfilPage,
    PublicarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    UserProvider,
    //Camera,
    //CameraPreview,
    //Crop,
    PublicacionProvider
  ]
})

export class AppModule {
}
