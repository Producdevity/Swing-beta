import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { Auth } from '../providers/auth';
import { WelcomePage } from '../pages/welcome/welcome';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any;
	loader: any;

	constructor(platform: Platform,
	            public auth: Auth,
	            public loadingCtrl: LoadingController) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			this.initApp();
			Splashscreen.hide();
		});
	}

	/**
	 * present loading popup
	 */
	presentLoading() {
		this.loader = this.loadingCtrl.create({content: 'Please wait...'}); // insert loading content
		this.loader.present(); // show loader
	}

	/**
	 * Initialize the application
	 * - display loader while checking
	 * - init the local database
	 * - check if logged in
	 */
	initApp() {
		this.presentLoading(); // show loader while auth Promise state is not set
		this.auth.login().then((isLoggedIn) => {
			this.rootPage = (isLoggedIn ? TabsPage : WelcomePage); // resolve the rootPage
			this.loader.dismiss(); //dismiss loader when auth Promise state is set
		});
	}

}
