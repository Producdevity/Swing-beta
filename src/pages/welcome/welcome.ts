import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';

@Component({
	selector:    'page-welcome',
	templateUrl: 'welcome.html'
})
export class WelcomePage {
	public currentUser: any;
	public date: any;


	constructor(public app: App, private af: AngularFire) {
		this.af.auth.subscribe(auth => {
			this.currentUser = auth;
			console.log(auth)
		});
		this.date = new Date();
	}

	/**
	 * Check if user excists, then redirect to app
	 */
	ngDoCheck() {
		// if (this.currentUser) this.app.getRootNav().setRoot(TabsPage);
	}

	/**
	 * Anonymous firebase login
	 * create user in db
	 */
	login() {
		this.af.auth.login({
			provider: AuthProviders.Anonymous,
			method:   AuthMethods.Anonymous,
		})
		this.af.auth.subscribe(auth => {
			if (auth) {
				let itemObservable = this.af.database.object(`/users/${auth.uid}`);
				itemObservable.set({
					createdOn: `${this.date}`
				});
			}
		});
	}

	logout() {
		this.af.auth.logout();
	}

	/**
	 * Start app onclick
	 * login the user anonyous
	 * redirect to the app
	 */
	goToApp() {
		this.login();
		this.app.getRootNav().setRoot(TabsPage);
	}

}
