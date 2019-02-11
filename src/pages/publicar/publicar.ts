import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';

/**
 * Generated class for the PublicarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {

  public publicationForm: FormGroup;
  public loader: any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public form: FormBuilder,
  	public alertCtrl: AlertController,
  	private loadingCtrl: LoadingController,
  	public storage: Storage,
  	public pubProvider: PublicacionProvider) {

  	this.publicationForm = this.form.group({
      description: ['', Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z0-9_.,¿?!¡-"_ ]*'), Validators.required])]
    })

    this.loader = this.loadingCtrl.create({
        content: 'Publicando...'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicarPage');
  }

  publicar() {
  	console.log('publicar');
  	this.loader.present();
  	if(this.publicationForm.valid) {
      console.log('Valido');
      console.log(this.publicationForm.value);  
      this.pubProvider.addPublication(this.publicationForm.value).then((result) => {
        console.log('result');
        console.log(result.toString());
        this.presentAlert('Publicacion', 'Publicacion realizada con exito');
        this.loader.dismiss();
        this.navCtrl.pop();
      }, (err) => {
        console.log('err');
        console.log(err);
        this.presentAlert('Lo sentimos', 'ha ocurrido un error inesperado');
        this.loader.dismiss();
      });
  	}
  	else {
  		this.presentAlert('Lo sentimos', 'Debes escribir en tu publicacion');
      this.loader.dismiss();
  	}
  }

  presentAlert(t: string, s: string) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: s,
      buttons: ['Ok']
    });
    alert.present();
  }	
}
