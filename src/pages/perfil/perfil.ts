import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { EditProfilePage } from "../edit-profile/edit-profile";
import { LoginPage } from "../login/login";
import { UserProvider } from '../../providers/user/user';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
 
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  })

export class PerfilPage {

  public userDetail: any;
  public perfil: any;
  public id: string;
  public fullName: string;
  public biography: string;
  public websites: string;
  public imageUrl: string;
  public following: number;
  public followers: number;
  public listPosts: any;

	posts = [
    {
      postImageUrl: 'assets/img/background/background-2.jpg',
      text: `I believe in being strong when everything seems to be going wrong.
             I believe that happy girls are the prettiest girls.
             I believe that tomorrow is another day and I believe in miracles.`,
      date: 'November 5, 2016',
      likes: 12,
      comments: 4,
      timestamp: '11h ago'
    },
    {
      postImageUrl: 'assets/img/background/background-3.jpg',
      text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
      date: 'October 23, 2016',
      likes: 30,
      comments: 64,
      timestamp: '30d ago'
    },
    {
      postImageUrl: 'assets/img/background/background-4.jpg',
      date: 'June 28, 2016',
      likes: 46,
      text: `Hope is the thing with feathers that perches in the soul
             and sings the tune without the words And never stops at all.`,
      comments: 66,
      timestamp: '4mo ago'
    },
  ];

  user = {
    name: 'Cosima Niehaus',
    twitter: '@CheekyEvoDevo',
    profileImage: '../assets/img/avatar/cosima-avatar.jpg',
    followers: 456,
    following: 1052,
    tweets: 35
  };

	imageUrl = '/assets/img/profile/portada.jpg';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider,
    public publProvider: PublicacionProvider) {
    this.listPosts = [];
    this.userDetail = [];
  }   

  ionViewWillEnter() {
    console.log('ionViewWillEnter PerfilPage');
    this.userDetail = JSON.parse(localStorage.getItem('usuario'));
    console.log('userDetail');
    console.log(this.userDetail);
    this.perfil = this.userDetail.usuario;
    console.log('perfil');
    console.log(this.perfil);
    this.fullName = (this.perfil.name + ' ' + this.perfil.surname);
    this.biography = this.perfil.biography;
    this.websites = this.perfil.websites;
    this.following = Number(this.perfil.countFollowing);
    this.followers = Number(this.perfil.countFollowers);
    this.id = this.perfil._id;

    this.publProvider.getpublicationsUser()
    .subscribe(publicaciones => {
      publicaciones = publicaciones.json();
      this.listPosts = publicaciones.publications;
      console.log(this.listPosts);
    }); 
  }

    deleteUser() {
      /*this.presentAlertConfirm('Eliminar Cuenta', '¿Esta seguro de eliminar su cuenta?')
      .then((result) => {
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
      });*/
      this.userProvider.deleteUser(this.id);
      this.presentAlert('Eliminar', 'Usuario eliminado');
      this.navCtrl.setRoot(LoginPage);
    }

  goToEditProfile() {
    this.navCtrl.push(EditProfilePage);
  }

  presentAlertConfirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title,
        message,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            confirm.dismiss().then(() => resolve(false));
            return false;
          }
        }, {
          text: 'Yes',
          handler: () => {
            confirm.dismiss().then(() => resolve(true));
            return false;
          }
        }]
      });

      return confirm.present();
    });
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

