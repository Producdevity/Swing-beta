import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map'

@Component({
	selector:    'page-map',
	templateUrl: 'map.html'
})
export class MapPage {
	zoom: number = 12;

	lat: number = 52.0973911;
	lng: number = 5.1145325;

	location: any;

	swings: FirebaseListObservable<any>;

	constructor(private fb: AngularFire) {
		this.swings      = fb.database.list('/swings');
		this.location    = {};
	}

	ngDoCheck() {
		if(this.location.latitude == undefined){
			this.getGeolocation();
		}
	}


	setPosition(position) {
		this.location = position.coords;
	}

	getGeolocation() {
		if (this.location.latitude == undefined) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
			}
		}
	}

}
