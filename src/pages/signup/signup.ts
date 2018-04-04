import { Component } from '@angular/core';
import {Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormBuilder,FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  const URL='http://sportrap-app.herokuapp.com/';
  signupForm: FormGroup;
  esportes: string=["FUTE","BSQT","VOLQ","FUTS"];


  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private http : Http) {


      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        nome:new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)])),
        nomeUsuario:new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)])),
        senha:new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
        email:new FormControl('',Validators.compose([Validators.required, Validators.pattern(emailRegex)])),
        dataNascimento:new FormControl('', Validators.compose([Validators.required,Validators.minLength(8)])),
        esporte_favorito_enum:new FormControl('', Validators.required)
      })

     }
  onSubmit(): void{
  this.register(this.getUsuario());
  }
  register(usuario): void{
    this.http.post(this.URL+'/usuario/novo', usuario).subscribe(data => {
        console.log(data)
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
  }
  getUsuario(): object{
    let usuario={
   "nomeCompleto":this.signupForm.controls['nome'].value,
   "nomeUsuario":this.signupForm.controls['nomeUsuario'].value,
   "senha":this.signupForm.controls['senha'].value,
   "email":this.signupForm.controls['email'].value,
   "dataNascimento":this.signupForm.controls['dataNascimento'].value,
   "esporteFavoritoEnum":this.signupForm.controls['esporte_favorito_enum'].value
    };
    return usuario;
}
}
