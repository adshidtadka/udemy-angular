import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authSubject = new Subject<any>();
  auth$ = this.authSubject.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  create(email: string, password: string): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(['/users/new']);
      });
  }

  login(email: string, password: string): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  logout(): void {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
}
