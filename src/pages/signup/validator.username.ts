
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { SignupService } from './signup.service';
export class UsernameValidator {
    private static http2:  Http;
    constructor(public http: Http, public signupService: SignupService) {  }
    static validUsername(fc: FormControl) {
        return SignupService.validUser
        this.http2
    }
    static validUser(fc: FormControl) {
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
