import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { USERS } from '../../providers/mock-user';
import { MapPage } from '../map/map';

@Component({
	selector:    'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	swings: FirebaseListObservable<any>;

	public searchQuery: string;

	public users = USERS;
	public currentUser: any;

	constructor(public navCtrl: NavController,
	            public alertCtrl: AlertController,
	            private fb: AngularFire) {
		this.swings      = fb.database.list('/swings/swings');
		this.currentUser = this.users[0];
		this.searchQuery = '';
	}

	onInput() {
		console.log('onInput');
	}

	onCancel() {
		console.log('cancel');
	}

	/**
	 * Go to MapPage onClick
	 */
	goToMap() {
		this.navCtrl.push(MapPage);
	}

	/**
	 * toggle the liked swing in currentUser likes array
	 * @param {string} swingId
	 */
	toggleLike(swingId) {
		let idx = this.currentUser.likes.indexOf(swingId);
		if (idx > -1) {
			this.currentUser.likes.splice(idx, 1);
		} else {
			this.currentUser.likes.push(swingId);
		}
	}

	/**
	 * return true is swing has been liked by current user
	 * @param {string} swingId
	 * @returns {boolean}
	 */
	hasLiked(swingId) {
		// return true;
		return this.currentUser.likes.indexOf(swingId) > -1;
	}

	/**
	 * like or remove like of clicked swing
	 * @param swing
	 */
	likeSwing(swing) {
		console.log(swing);
		if (this.hasLiked(swing.$key)) {
			swing.likes--;
		} else {
			swing.likes++;
		}
		this.toggleLike(swing.$key);
	}

}
