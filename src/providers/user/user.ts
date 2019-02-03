import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; //HttpHeaders, RequestOptions
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

	urlServer: String = 'http://localhost:3000/PetSide/';

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  loginUser(email, password){
      //return this.http.get(this.urlServer+'user/loginUser/username/'+username+'/password/'+password);
      let body = { email, password };
      return this.http.post(this.urlServer + 'SingIn', body);
      //return this.http.post('http://instantsales.us-3.evennode.com/login', body)
  }

  getUserByEmail(email){
      var data = {'email': email};
      return this.http.post(this.urlServer + 'findUserByEmail', data);
  }

  getUserByEmailVal(email){
      var data = {'email': email};
      return new Promise((resolve, reject) => {
        this.http.post(this.urlServer + 'findUserByEmail', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  addUser(data) {
    /*let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers });*/
    var headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('data');
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer + 'SingUp', data, headers)
      //this.http.post('http://instantsales.us-3.evennode.com/addUser', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
}

  editUser(data) {
    var body = {"user": data};
    console.log(body);
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/updateUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
