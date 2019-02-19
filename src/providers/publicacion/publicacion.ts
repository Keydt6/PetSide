import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PublicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PublicacionProvider {

	urlServer: String = 'http://localhost:3001/PetSide/';
	public userDetails: any;
	public perfil: any;

  constructor(public http: Http) {
    console.log('Hello PublicacionProvider Provider');
    this.userDetails = [];
    this.perfil = [];
  }

  addPublication(publicacion) {
    var headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('publicacion');
    console.log(publicacion);
    this.userDetails = JSON.parse(localStorage.getItem("usuario"));
    this.perfil = this.userDetails.usuario;
    console.log('userDetails');
    console.log(this.userDetails);
    console.log('perfil');
    console.log(this.perfil);
    console.log('name');
    console.log(this.perfil.name);
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer + 'savePublication/' + this.perfil._id, publicacion, headers)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getpublications() {
    return this.http.get(this.urlServer + 'findPublications/');
  }

  getpublicationsUser() {
    this.userDetails = JSON.parse(localStorage.getItem("usuario"));
    this.perfil = this.userDetails.usuario;
    return this.http.get(this.urlServer + 'findPublicationsByUser/' + this.perfil._id);
  }

  addLike(post) {
    console.log('post provider');
    console.log(post);
    console.log('id post provider');
    console.log(post._id);
    var headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer + 'likePublication/' + post._id, post, headers)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
