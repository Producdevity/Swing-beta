import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Auth {
	public currentUser: any;

	constructor(public http: Http, public af: AngularFire) {
		this.af.auth.subscribe(auth => {
			this.currentUser = auth;
			// this.currentUser;
		});
	}

	// fake login check for testing
	login(){
		return new Promise((resolve) => {
			setTimeout(() => {
				// resolve(this.currentUser);
				resolve(false);
			}, 1000);
		});
	}

	startApp() {
		this.af.auth.login({
			provider: AuthProviders.Anonymous,
			method:   AuthMethods.Anonymous,
		});
	}


}
