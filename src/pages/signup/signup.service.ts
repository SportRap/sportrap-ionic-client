import { Http } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormControl } from '@angular/forms';

export class SignupService {
    URL = 'http://sportrap-app.herokuapp.com';
    esportes: string[] = [];

    constructor(private http: Http) {
        this.getEsportes();
    }
    register(usuario): void {
        this.http.post(this.URL + '/usuario/novo', usuario).subscribe(data => {
            console.log(data);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
    }

    getEsportes(): string[] {
        this.http.get(this.URL + '/evento/descricaoEsportes')
            .map(res => res.json())
            .subscribe(data => {
                return data;
            });
        return null;
    }
    validUser(fc: FormControl) {
        this.http.get(this.URL + '/usuario/novo/nome/' + fc.value, )
            .map(res => res.json())
            .subscribe(data => {
                if (data) {
                    return ({ validUsername: true });
                } else {
                    return (null);
                }
            });
    }
}
