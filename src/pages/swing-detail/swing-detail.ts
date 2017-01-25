import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector:    'page-swing-detail',
	templateUrl: 'swing-detail.html'
})
export class SwingDetailPage {
	public location: any;
	private name: string;
	private likes: string;
	private city: string;
	private houseNumber: string;
	private zipcode: string;
	private street: string

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.location = {};
	}

	ionViewDidLoad() {
		this.location    = this.navParams.get('location');
		this.name        = this.navParams.get('name');
		this.likes       = this.navParams.get('likes');
		this.city        = this.navParams.get('city');
		this.houseNumber = this.navParams.get('houseNumber');
		this.street      = this.navParams.get('street');
		this.zipcode     = this.navParams.get('zipcode');
	}

}
