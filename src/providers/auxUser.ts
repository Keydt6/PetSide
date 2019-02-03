import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//joanrosendo181282
/*
 Clase UserProvider
 Se usa para conectarse a los endpoints del servidor de la app 
 que maneja las funciones del usuario
*/
@Injectable()
export class UserProvider {

  
  
   //urlServer: String = 'intranet/';
   //urlServer : string = 'http://instantsales.us-3.evennode.com/api/';
   urlServer: String = 'http://localhost:3000/PetSide/'

  
  constructor(public http: HttpClient) {

  }
 
  getUser(idString, idStringLogged){
    var data = {"idString": idString, "idStringLogged": idStringLogged};
    var body = {"user": data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer + 'user/getUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  //joan181282
  getUserByUsername(username){
    var data = {'username': username};
    return new Promise((resolve, reject) => {
        this.http.post(this.urlServer + 'user/getUserByUsername/', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
        });
    });
  }

  getUserByEmail(email){
      var data = {'email': email};
      return new Promise((resolve, reject) => {
        this.http.post(this.urlServer + 'user/getUserByEmail/', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }


  loginUser(username, password){
      //return this.http.get(this.urlServer+'user/loginUser/username/'+username+'/password/'+password);
      let body = {username,password};
      return this.http.post('http://localhost:3000/login', body)
      //return this.http.post('http://instantsales.us-3.evennode.com/login', body)
  }

  addUser(data) {
	  data['countpublications'] = 0;
	  data['countFollowers'] = 0;
	  data['countFollowing'] = 0;

	  data['profilePicture'] = 'assets/imgs/icon-user.png';
	  var body = {"user": data};
	  console.log(body);
	  return new Promise((resolve, reject) => {
	    this.http.post('http://localhost:3000/addUser', body)
	    //this.http.post('http://instantsales.us-3.evennode.com/addUser', body)
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

  addUserfb(data) {
    data['countpublications'] = 0;
    data['countFollowers'] = 0;
    data['countFollowing'] = 0;
   
    var body = {"user": data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/addUser/', body)
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

  updateUserPicture(data){
    var body = {"user": data};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/updateUserPhotoProfile/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getFollowers(userId, userIdLogged){
    var body = {users:{userId,userIdLogged}, type:"Followers"}
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/getFriends/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getFollowing(userId, userIdLogged){
    var body = {users:{userId,userIdLogged}, type:"Following"}
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/getFriends/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addFollower(followerId, followedId){
    var body = {"followerId": followerId, "followedId":followedId};
    var data = {"follower": body};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/addFollower/', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteFollower(followerId, followedId){
    var body = {"followerId": followerId, "followedId":followedId};
    var data = {"follower": body};
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/deleteFollower/', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  //Metodo que se trae todos los likes que ha recibido un usuario
  getLikesUser(idString){
    var body = {"idString": idString};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/getLikesUser/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /*Metodo que verifica si un usuario tiene notificaciones de like
  que no ha visto*/
  areNewLikes(idString){
    var body = {"idString": idString};
    return new Promise((resolve, reject) => {
      this.http.post(this.urlServer+'user/areNewLikes/', body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
