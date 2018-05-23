import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  itemList: AngularFireList<any>;
  user: Observable<firebase.User>;
  public isLoggedIn: Boolean = false;
  email = '';
  password = '';

  constructor(public db: AngularFireDatabase , private fire: AngularFireAuth , private router: Router) {
    this.itemList = db.list('users');


    let status = localStorage.getItem('isLoggedIn')
    console.log(status)

    if (status === 'true') {
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }


    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     this.isLoggedIn = true;
    //   } else {
    //     // No user is signed in.
    //     this.isLoggedIn = false;

    //   }
    // });


  }

  ngOnInit() {
  }

//Register with email and password
myRegister() {
  this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
  .then(user => {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', this.fire.auth.currentUser.email );

    this.fire.authState.subscribe(auth => {
      if (auth) {
        localStorage.setItem('uid', auth.uid );
this.itemList.push({
  email: this.email ,
  uid : auth.uid,
  name : 'user'  ,
  phone :  '0770' ,
  age : '' ,
  address :  '' ,
  city :  '' ,
  illness : '',

  image: 'assets/img/person.png'
});
      }
    });

    this.router.navigate(['home']);
  }).catch( error => {
    console.error(error);
  });
}


//Register  with facebook and gmail account

signInWithFacebook() {
  this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  .then(user => {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', this.fire.auth.currentUser.email );

    this.fire.authState.subscribe(auth => {
      if (auth) {
        localStorage.setItem('uid', auth.uid );
        this.itemList.push({
          email: this.email ,
          uid : auth.uid,
          name : 'user'  ,
          phone :  '0770' ,
          age : '' ,
          address :  '' ,
          city :  '' ,
          illness : '',

          image: 'assets/img/person.png'
        });
      }
    });

    this.router.navigate(['home']);
  }).catch( error => {
    console.error(error);
  });
}

signInWithGoogle() {
  this.fire.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
  .then(user => {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', this.fire.auth.currentUser.email );

    this.fire.authState.subscribe(auth => {
      if (auth) {
        localStorage.setItem('uid', auth.uid );
        this.itemList.push({
          email: this.email ,
          uid : auth.uid,
          name : 'user'  ,
          phone :  '0770' ,
          age : '' ,
          address :  '' ,
          city :  '' ,
          illness : '',

          image: 'assets/img/person.png'
        });
      }
    });

    this.router.navigate(['home']);
  }).catch( error => {
    console.error(error);
  });
}




// logOut

  logout() {
    this.fire.auth.signOut();
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('email', '' );
    localStorage.setItem('uid', '' );

    this.router.navigate(['/home']);
  }





  //  LogIn with email and password

  myLogin() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(user => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', this.fire.auth.currentUser.email );

      this.fire.authState.subscribe(auth => {
        if (auth) {
  localStorage.setItem('uid', auth.uid );

        }
      });
    this.router.navigate(['/home']);
    }).catch(error => {
      console.error(error);
    });
  }

//LogIn  with facebook and gmail account

  logInWithFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(user => {
      this.isLoggedIn = true;
      console.log(this.email, this.password);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', this.fire.auth.currentUser.email );

      this.fire.authState.subscribe(auth => {
        if (auth) {
          localStorage.setItem('uid', auth.uid );

        }
      });

      this.router.navigate(['/home']);
    }).catch( error => {
      console.error(error);
    });

  }


  logInWithGoogle() {
    this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(user => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email',
      this.fire.auth.currentUser.email );

      this.fire.authState.subscribe(auth => {
        if (auth) {
          localStorage.setItem('uid', auth.uid );

        }
      });

      this.router.navigate(['/home']);
    }).catch( error => {
      console.error(error);
    });

  }
}
