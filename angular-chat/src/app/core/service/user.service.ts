import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { User } from './../../class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  create(email: string, password: string): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.db.object(`/users/${user.user.uid}`).set(new User(user.user));
        this.router.navigate(['/users/new']);
      });
  }

  update(values): void {
    this.afAuth.auth.currentUser
      .updateProfile(values)
      .then(() => {
        this.db
          .object(`/users/${this.afAuth.auth.currentUser.uid}`)
          .update(values);
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }
}
