import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
	GoogleMap,
	GoogleMapsEvent,
	GoogleMapsLatLng,
	CameraPosition,
	GoogleMapsMarkerOptions,
	GoogleMapsMarker
} from 'ionic-native';

/*
 Generated class for the Map page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
	selector:    'page-map',
	templateUrl: 'map.html'
})
export class MapPage {
	lat: number = 51.678418;
	lng: number = 7.809007;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MapPage');
	}

// Load map only after view is initialize
	ngAfterViewInit() {
		console.log('ngAfterViewInit');
		this.loadMap();
	}

	loadMap() {
		// create a new map by passing HTMLElement
		let element: HTMLElement = document.getElementById('map');

		let map = new GoogleMap(element);

		// listen to MAP_READY event
		map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

		// create LatLng object
		let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904, -89.3809802);

		// create CameraPosition
		let position: CameraPosition = {
			target: ionic,
			zoom:   18,
			tilt:   30
		};

		// move the map's camera to position
		map.moveCamera(position);

		// create new marker
		let markerOptions: GoogleMapsMarkerOptions = {
			position: ionic,
			title:    'Ionic'
		};

		map.addMarker(markerOptions)
				.then((marker: GoogleMapsMarker) => {
					marker.showInfoWindow();
				});
	}

}
