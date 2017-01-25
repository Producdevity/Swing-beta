import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-swing-detail',
	templateUrl: 'swing-detail.html'
})
export class SwingDetailPage {
	public title: string;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
			this.title = this.navParams.get('title');
	}

}
