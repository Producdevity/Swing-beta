import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'distance'
})
export class DistancePipe implements PipeTransform {

	transform(distance: number) {
		if (distance==null) return null;
		if(isNaN(distance)) return 'loading...'
		if (distance >= 100) {
			return (distance/1000).toFixed(1) + ' km';
		} else {
			return (distance * 1).toFixed(0) + ' m';
		}
	}
}
