import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  registerUser(email: string, password: string) {
   return this.afsAuth.createUserWithEmailAndPassword(email, password)
  }

  loginUser(email, password) {
    return this.afsAuth.signInWithEmailAndPassword(email, password)
  }
}
