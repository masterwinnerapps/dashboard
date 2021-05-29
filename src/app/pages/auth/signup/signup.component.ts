import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validator, EmailValidator, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public registerForm: FormGroup;
  hide = true;
  constructor(
    private fbuilder: FormBuilder,
    private afs: AngularFirestore,
    private auths: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      email: ['',Validators.required],
      password: ['', Validators.required],

    })
  }
  signUp() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const firstName = this.registerForm.value.firstName;
    const lastName = this.registerForm.value.lastName;
    const province = this.registerForm.value.province;
    const city = this.registerForm.value.city;


    this.auths.registerUser(email, password)
      .then(async auth => {
        const user = {
          uid: auth.user.uid,
          email,
          firstName,
          lastName,
          province,
          city,
          photoURL: ""
        };
        await this.afs.collection('mw-accounts')
        .add(user)
        await auth.user.sendEmailVerification();
        await auth.user.updateProfile({
          displayName: firstName + ' ' + lastName
        })

        console.log(auth.user)
    })
}
}
