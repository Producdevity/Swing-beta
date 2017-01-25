import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { USERS } from '../../providers/mock-user';
import { MapPage } from '../map/map';
import { Http } from '@angular/http';
import { SwingDetailPage } from '../swing-detail/swing-detail';

@Component({
	selector:    'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public filterSwitch: string;
	swings: FirebaseListObservable<any>;

	location: any;
	lat: number = 52.0973911;
	lng: number = 5.1145325;
	geoOff: boolean;

	swingGeocoded: any;
	public searchQuery: string;
	public users = USERS;
	public currentUser: any;
	TodayDate: any;
	todayMinutes: any;
	day: any;
	time: any;

	constructor(public navCtrl: NavController,
	            public alertCtrl: AlertController,
	            private fb: AngularFire,
	            private http: Http) {
		this.filterSwitch = 'status';
		this.currentUser = this.users[0];
		this.swings      = fb.database.list('/swings');
		this.geoOff = false;

		this.TodayDate = new Date();
		this.day = this.TodayDate.getDay();
		this.time = this.TodayDate.getTime();

		this.location    = {};
		this.searchQuery = '';
		this.todayMinutes = this.getTodayMinutes();
	}


	/**
	 * Check if current location is set
	 * if set receive swings from the db
	 */
	ngAfterViewChecked() {
		if(this.location.latitude == undefined){
			this.getGeolocation();
		} else {
			if(Object.keys(this.swings).length === 0 && this.swings.constructor === Object){
				this.swings      = this.fb.database.list('/swings');
			}
		}
	}


	isEmpty(obj) {
		return obj.status == "ZERO_RESULTS";
	}

	getGeocode(zipcode, street, housenumber, swingId) {
		let address = `${zipcode}+${street}+${housenumber}`;
		// return this.http.get('http://maps.google.com/maps/api/geocode/json?address=Contactweg+36');
		// don't have the data yet
		return new Promise(resolve => {
			// We're using Angular HTTP provider to request the data,
			// then on the response, it'll map the JSON data to a parsed JS object.
			// Next, we process the data and resolve the promise with the new data.
			// this.http.get('http://maps.google.com/maps/api/geocode/json?address=Contactweg+36')
			this.http.get(`https://maps.google.com/maps/api/geocode/json?address=${address}`)
					.map(res => res.json())
					.subscribe(data => {
						// we've got back the raw data, now generate the core schedule data
						// and save the data for later reference
						if (!this.isEmpty(data)) {
							this.swingGeocoded = data;
							resolve(this.swingGeocoded);
							this.swings.update(swingId, { location: this.swingGeocoded.results[0].geometry.location });
						}
					});
		});
	}

	addCoords(swing) {
		console.log(swing);
		this.getGeocode(swing.zipcode, swing.street, swing.houseNumber, swing.$key)
				.then(data => console.log(data));
	}

	/**
	 * present alert when GPS if turned off
	 * @param err
	 */
	presentAlert(err) {
		if(!this.geoOff){
		console.log(err);

		let alert = this.alertCtrl.create({
			title: 'Location not found',
			subTitle: 'Please turn on your GPS or locaton service if you want to filter on distance',
			buttons: ['Ok']
		});
		this.geoOff = true;
		this.filterSwitch = 'status';
		alert.present();
		}
	}

	isLoading() {
		if(this.geoOff){
			return false
		} else if(this.location.latitude == undefined){
			return true;
		}
	}


	/**
	 * get right format of current time
	 * @returns {{h: number, m: number}}
	 */
	getTodayMinutes() {
		let m = this.TodayDate.getMinutes();
		let h = this.TodayDate.getHours();
		let timeObj = {
			h: h,
			m: m
		}
		return timeObj;
	}

	/**
	 * get right format of SWINGS closing hours
	 * @param swingTime
	 * @returns {{h: string, m: string}}
	 */
	getSwingMinutes(swingTime){
		let arrayTime = swingTime.split(' - ');
		let closeTime = arrayTime[1];
		let cl = closeTime.split(':')
		let timeObj = {
			h: cl[0],
			m: cl[1]
		}
		return timeObj;
	}

	/**
	 * Return true if the SWING is open
	 * @param swingTime
	 * @returns {boolean}
	 */
	isOpen(swingTime){
		if(!swingTime) return false; // return false if swing has no time
		let timeObj = this.getSwingMinutes(swingTime);
		let timeObjNow = this.getTodayMinutes();
		let dateSwing = new Date(2017, 0, 1,  timeObj.h, timeObj.m); // Date of swing closing
		let midNight = new Date(2017, 0, 1,  0, 0); // Date (midnight)
		let dateToday = new Date(2017, 0, 1, timeObjNow.h, timeObjNow.m); // Current Date
		// Check if the swing is closing past midnight, if true, add 1 day to swing
		if (midNight < dateSwing || (timeObj.h == '00' && timeObj.m == '00')) {
			dateSwing.setDate(dateSwing.getDate() + 1);
		}
		return dateSwing > dateToday;
	}

	/**
	 * Calculate the radius of ${x}
	 * @param x
	 * @returns {number}
	 */
	rad(x) {
		return x * Math.PI / 180;
	}

	/**
	 * Get the distance between current location and ${point}
	 * @param point
	 * @returns {number} distance in meter
	 */
	getDistance(point) {
		let R     = 6378137; // Earth’s mean radius in meter
		let dLat  = this.rad(point.lat - this.location.latitude);
		let dLong = this.rad(point.lng - this.location.longitude);
		let a     = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(this.rad(this.location.latitude)) * Math.cos(this.rad(point.lat)) *
				Math.sin(dLong / 2) * Math.sin(dLong / 2);
		let c     = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		let d     = R * c;
		return d; // returns the distance in meter
	}

	/**
	 * set location to current position (lat and lng)
	 * @param position
	 */
	setPosition(position) {
		this.location = position.coords;
	}

	/**
	 * Get geolocation of current location
	 * call setPosition()
	 */
	getGeolocation(){
		if (this.location.latitude == undefined) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.presentAlert.bind(this));
			}
		}
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
		return this.currentUser.likes.indexOf(swingId) > -1;
	}

	/**
	 * like or remove like of clicked swing
	 * @param swing
	 */
	likeSwing(swing) {
		if (this.hasLiked(swing.$key)) {
			swing.likes--;
			this.swings.update(swing.$key, { likes: swing.likes });
		} else {
			swing.likes++;
			this.swings.update(swing.$key, { likes: swing.likes });
		}
		this.toggleLike(swing.$key);
	}

	/**
	 * Go to swing detail page
	 */
	swingDetail(swing) {
		console.log(swing);
		let data = {
			location: swing.location,
			name: swing.name,
			likes: swing.likes,
			city: swing.city,
			houseNumber: swing.houseNumber,
			street: swing.street,
			zipcode: swing.zipcode
		}
		this.navCtrl.push(SwingDetailPage, data);
	}

}
