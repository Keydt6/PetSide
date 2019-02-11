import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {
  constructor(public alertCtrl: AlertController) { }

  presentAlert(title: string, message: string) {
    const alert = this.alertCtrl.create(
      {
        title,
        subTitle: message,
        buttons: [
          {
            text: 'OK'
          }
        ]
      });

    return alert.present();
  }

  presentErrorAlert(message: string) {
    return this.presentAlert('An error has occurred.', message);
  }

  presentAlertWithCallback(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title,
        message,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            confirm.dismiss().then(() => resolve(false));
            console.log('Cancelar');
            return false;
          }
        }, {
          text: 'Si',
          handler: () => {
            confirm.dismiss().then(() => resolve(true));
            console.log('Si');
            return true;
          }
        }]
      });

      return confirm.present();
    });
  }
}
