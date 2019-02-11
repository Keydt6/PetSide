import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
	public myForm: FormGroup;
  public loader: any;
  public usuario: any;
  public updateUser: any;
  public id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  	public formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public userProvider: UserProvider) {
  	this.myForm = this.createMyForm();
  }

  saveData(){
    this.loader = this.loadingCtrl.create({
        content: 'Actualizando informacion...'
      });
    this.loader.present();

    console.log(this.myForm.value);
    if(this.myForm.valid) {
      console.log('updateUser');
      console.log(this.myForm.value);
      this.userProvider.editUser(this.id, this.myForm.value);
      this.loader.dismiss();      
      this.presentAlert('Actualizacion', 'Sus datos se ha Actualizado');
      this.updateStorage();
      this.navCtrl.pop();
    }
    else {
      console.log('Invalido');
      this.presentAlert('Lo sentimos', 'Verifique sus datos');
      this.loader.dismiss();
    }
  }

  updateStorage() {
    let auxUsuario = JSON.parse(localStorage.getItem('usuario'));
    let auxPerfil = auxUsuario.usuario;
    auxPerfil.name = this.myForm.value.name;
    auxPerfil.surname = this.myForm.value.surname;
    auxPerfil.websites = this.myForm.value.websites;
    auxPerfil.biography = this.myForm.value.biography;
    auxPerfil.direction = this.myForm.value.direction;
    auxPerfil.number = this.myForm.value.number;
    auxPerfil.gender = this.myForm.value.gender;
    let userStorage = {'usuario': auxPerfil};
    localStorage.setItem('usuario', JSON.stringify(userStorage));
  }
  
  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      surname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      websites: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_.*$#-%/@ ]*')])],
      biography: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9_.,/ ]*')])],
      direction: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      number: ['', Validators.compose([Validators.maxLength(11), Validators.pattern('[0-9-]*')])],
      gender: ['', Validators.required],
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

  ionViewWillEnter() {
    console.log('ionViewDidLoad EditProfilePage');
    this.userDetail = JSON.parse(localStorage.getItem('usuario'));
    console.log('userDetail');
    console.log(this.userDetail.usuario);
    this.id = this.userDetail.usuario._id;
    this.myForm.get('name').setValue(this.userDetail.usuario.name);
    this.myForm.get('surname').setValue(this.userDetail.usuario.surname);
    this.myForm.get('websites').setValue(this.userDetail.usuario.websites);
    this.myForm.get('biography').setValue(this.userDetail.usuario.biography);
    this.myForm.get('direction').setValue(this.userDetail.usuario.direction);
    this.myForm.get('number').setValue(this.userDetail.usuario.number);
    this.myForm.get('gender').setValue(this.userDetail.usuario.gender);
  }
}
