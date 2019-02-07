import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, LoadingController} from "ionic-angular";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import {LoginPage} from "../login/login";
//import {EditProfilePage} from "../edit-profile/edit-profile";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

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
    countFollowers: 0,
    countFollowing: 0,
    profilePicture: '',
    coverPagePicture: ''
  };

  private email: string;
  private password: string;
  private passConfirm: string;
  private name: string;
  public formRegistro: FormGroup;
  public loader: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private loadingCtrl: LoadingController,
    public form: FormBuilder,
    public alertCtrl: AlertController,
    public userProvider: UserProvider) {

    this.name = '';
    this.email = '';
    this.password = '';
    this.passConfirm = '';

    this.formRegistro = this.form.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9_.*$#-%/]*'), Validators.required])],
      passconfirm: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9_.*$#-%/]*'), Validators.required])]
    }, {validator: this.matchingPasswords('password', 'passconfirm')})
    
  }

  // register and go to home page
  register() {
    console.log('Registro');

    this.loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    this.loader.present();

    if(this.formRegistro.valid) {
      console.log('Valido');
      console.log(this.formRegistro.value);
      console.log(this.formRegistro.value.email);
      this.userProvider.getUserByEmail(this.formRegistro.value.email).subscribe((result) => {
        console.log('result');
        console.log(result.toString());
        this.presentAlert('Lo sentimos', 'Este Email se encuentra registrado');   
        this.loader.dismiss();
      }, (err) => {
        console.log('err');
        if(err.status===404) {
          var data = this.formRegistro.value;
          this.userProvider.addUser(data).then((result) => {
            console.log('result');
            console.log(result.toString());
            this.presentAlert('Registro', 'Te has registrado con exito');
            this.loader.dismiss();
            this.storage.set('usuario', data);
            localStorage.setItem('usuario', JSON.stringify(data));
            this.nav.setRoot(HomePage, { userReg: data });
          }, (err) => {
            console.log('err');
            console.log(err);
            this.presentAlert('Lo sentimos', 'ha ocurrido un error inesperado');
            this.loader.dismiss();              
          });
        }
        this.loader.present();
      });
    }
    else {
      console.log('Invalido');
      console.log(this.formRegistro.value.password);
      console.log(this.formRegistro.value.passconfirm);
      if (this.formRegistro.value.password !== this.formRegistro.value.passconfirm) {
        this.presentAlert('Error de confirmacion', 'Su Password no coincide')
      }
      else {
      this.presentAlert('Completar Datos', 'Debe introducir todos los datos');
      }
      this.loader.dismiss();
    }
  }

  presentAlert(t: string, s: string) {
      let alert = this.alertCtrl.create({
        title: t,
        subTitle: s,
        buttons: ['Try Again']
      });
      alert.present();
  }

  validateEmailNotTaken(control: FormControl) {
    console.log(control.value);
    //this.submitAttempt = false;
    return this.userProvider.getUserByEmailVal(control.value).then((result) => {
      return result ? { emailTaken: true } : null;
    }, (err) => {
      console.log(err);
    });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
       //this.submitAttempt=false;
      if (password.value !== confirmPassword.value) {
        console.log("distita");
        return {
          mismatchedPasswords: true

        };
      }
    }
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
