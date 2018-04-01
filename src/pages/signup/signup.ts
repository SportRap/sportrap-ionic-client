import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams) {

      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        nome:new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)])),
        nomeUsuario:new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)])),
        senha:new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
        email:new FormControl('',Validators.compose([Validators.required, Validators.pattern(emailRegex)])),
        dataNascimento:new FormControl('', Validators.compose([Validators.required,Validators.minLength(8)]))
      });
     }
  onSubmit(): void{
    console.log('Form submited!');
  }


}
