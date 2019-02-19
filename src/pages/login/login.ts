import {Component} from "@angular/core";
import { NavController, NavParams, AlertController, LoadingController,
        ToastController, MenuController} from "ionic-angular";
//import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {
    email: '',
    password:'',
    name: '',
    surname: '',
    websites: '',
    biography: '',
    direction: '',
    gender: '',
    countpublications: 0,
    countFollowers:0,
    countFollowing:0,
    profilePicture: '',
    coverPagePicture: ''
  };

  private email: string;
  private password: string;
  public loader: any;
  public User: any;
  public User2: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public menu: MenuController,
    public userProvider: UserProvider,
    public storage: Storage
    //private translateService: TranslateService
    ) {
    this.menu.swipeEnable(false);
    
    this.email = '';
    this.password = '';
    this.User = [];
    this.User2 = [];
  }

  // go to register page
  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    console.log(this.email);
    console.log(this.password);

    this.loader = this.loadingCtrl.create({
        content: 'Loanding...'
      });
    this.loader.present();

    if(this.email != '' && this.password != '') {
      this.userProvider.loginUser(this.email, this.password)
      .subscribe( data => {
          data  = data.json();
          console.log('data');
          console.log(data);
          if(data){
            this.User = data;
            this.loader.dismiss();
            localStorage.setItem('usuario', JSON.stringify(data));
            this.storage.set('usuario', JSON.stringify(data));
            this.navCtrl.setRoot(HomePage);
          } 
        }, error => {
          console.log(error);
          if(error.status==404)
            this.presentAlert();
          else
            this.presentAlertConex();
          this.loader.dismiss();
        });
    } else {
      console.log("Ingresar Email y Password.");
      this.presentVoidAlert();
      this.loader.dismiss();
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Bienvenido a petSide',
      duration: 3000,
      position: 'top',
      //cssClass: 'dark-trans',
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toast.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Datos Incorrectos',
      subTitle: 'Email o Password es incorrecto',
      buttons: ['Try Again']
    });
    alert.present();
  }

  presentVoidAlert() {
    let alert = this.alertCtrl.create({
      title: 'Completar Datos',
      subTitle: 'Debe Introducir Email y Password',
      buttons: ['Try Again']
    });
    alert.present();
  }

  presentAlertConex() {
    let alert = this.alertCtrl.create({
      title: 'Error de Conexión',
      subTitle: 'Verifique su Conexión a internet',
      buttons: ['Try Again']
    });
    alert.present();
  }

  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: 'Olvidaste tu Password?',
      message: "Ingresa tu dirección de correo para enviar un enlace de reinicio de password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email enviado con exito',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
