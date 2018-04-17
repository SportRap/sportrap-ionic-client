import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormBuilder,FormGroup, Validators, FormControl } from '@angular/forms';
import { Toast, IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  URL='http://sportrap-app.herokuapp.com';
  signupForm: FormGroup;
  esportes: string[]=[];
  usuarioValido: boolean=false;


  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private http : Http,
    private toastCtrl: ToastController) {


      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        nome:new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)])),
        nomeUsuario:new FormControl('', Validators.compose([Validators.required,Validators.minLength(3)])),
        senha:new FormControl('', Validators.compose([Validators.required,Validators.minLength(6)])),
        email:new FormControl('',Validators.compose([Validators.required, Validators.pattern(emailRegex)])),
        dataNascimento:new FormControl('', Validators.compose([Validators.required,Validators.minLength(8)])),
        esporte_favorito_enum:new FormControl('', Validators.required)
      })
      this.getEsportes();

     }
  onSubmit(): void{
    if (this.validUser()){
      this.register(this.getUsuario());
    }
  }
  register(usuario): void{
    this.http.post(this.URL+'/usuario/novo', usuario).subscribe(data => {
        console.log(data)
        this.presentToast('Usuário cadastrado com sucesso','toast-success');
    }, error => {
        console.log(JSON.stringify(error.json()));
        this.presentToast('Deu ruim','toast-fail')
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
  presentToast(mensagem,classe) {
    let toast: Toast = this.createToast();
    toast.data.message = mensagem;
    toast.data.cssClass = classe;
    toast.present();
  }
  createToast(): Toast{
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'top'
    });
    return toast;
  }
  validUser(): Boolean{
        this.http.get(this.URL+'/usuario/novo/nome/'+ this.signupForm.controls['nomeUsuario'].value , )
        .map(res => res.json())
        .subscribe(data => {
           return data;
          });
          return false;
  }
  getEsportes(): void{
        this.http.get(this.URL+'/evento/descricaoEsportes')
        .map(res => res.json())
        .subscribe(data => {
            this.esportes = data;
          });
        }
}
