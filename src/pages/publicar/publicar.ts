import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
/*
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
*/

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
  public cropped_img_base64: any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public form: FormBuilder,
  	public alertCtrl: AlertController,
  	private loadingCtrl: LoadingController,
  	public storage: Storage,
  	public pubProvider: PublicacionProvider
    /*private cameraPreview: CameraPreview,
      public crop: Crop,
      public camera: Camera,
      */
    ) {

  	this.publicationForm = this.form.group({
      description: ['', Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z0-9_.*$#-%/@!¡¿? ]*'), Validators.required])]
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
      let publ = this.publicationForm.value;
      //publ['photo': cropped_img_base64];
      this.pubProvider.addPublication(publ).then((result) => {
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

  // Acceder a Galería con el plugin nativo camera
 /*accessGallery(){
   let option = {
      quality:100,
      targetHeight: window.screen.width,
      targetWidth: window.screen.width,
    };

   this.camera.getPicture({ 
     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.FILE_URI,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG
    }).then((imageData) => {
      this.crop.crop(imageData, option).then(newImageUrl => {
        let image = new Image();
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        image.src = newImageUrl;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.width;
          ctx.drawImage(image,
              0, 0,           
              image.width, image.height,    
              0, 0,                               
              image.width, image.height);
          this.cropped_img_base64 = canvas.toDataURL();
        }
      }, error => alert(error));
     }, (err) => {
      alert(err);
    });
  }*/
}
