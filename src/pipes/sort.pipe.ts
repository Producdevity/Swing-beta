import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'orderByDis'
})
export class OrderByPipe implements PipeTransform {

	rad(x) {
		return x * Math.PI / 180;
	}

	getDistance(p2, location) {
		var R     = 6378137; // Earth’s mean radius in meter
		var dLat  = this.rad(p2.lat - location.latitude);
		var dLong = this.rad(p2.lng - location.longitude);
		var a     = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(this.rad(location.latitude)) * Math.cos(this.rad(p2.lat)) *
				Math.sin(dLong / 2) * Math.sin(dLong / 2);
		var c     = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d     = R * c;
		return d; // returns the distance in meter
	}

	transform(array: Array<any>, args: any): Array<any> {
		// console.log(args);
		if (array==null) {
			return null;
		}
		array.sort((a: any, b: any) => {
			a = this.getDistance(a.location, args);
			b = this.getDistance(b.location, args);
			if (a < b) {
				return -1;
			} else if (a > b) {
				return 1;
			} else {
				return 0;
			}
		});
		return array;
	}
}
