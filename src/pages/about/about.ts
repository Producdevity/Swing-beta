import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { USERS } from '../../providers/mock-user';
import { User } from '../../models/user.model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector:    'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	public users = USERS;
	private currentUser: User;
	public swings: any;
	       swing: FirebaseObjectObservable <any>;
	       item: FirebaseObjectObservable <any>;

	constructor(public navCtrl: NavController,
	            private fb: AngularFire) {
		// this.swings      = fb.database.list('/user/');
		// this.swing       = fb.database.object('/swings/-KYNfdsashjdfypoombdvyUNlLv');
		this.currentUser = this.users[0];
		// this.fb.auth.subscribe(auth => {
		// 	if(auth){
		// 		// this.currentUser = auth;
		// 		this.item = fb.database.object(`/users/${auth.uid}`, { preserveSnapshot: true });
		// 		this.item.subscribe(snapshot => {
		// 			console.log(snapshot.key)
		// 			console.log(snapshot.val())
		// 			this.currentUser = snapshot.val();
		// 			this.swings = fb.database.list('/swings');
		// 		});
		//
		// 	}
		// 	console.log(auth)
		// });
		// console.log(this.currentUser);
	}

	ngAfterViewInit() {
		// console.log(this.swing);
	}

	getSwing(swingId) {
		// console.log(swingId);
		return this.fb.database.object(`/swings/${swingId}`);
	}

}
