import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'orderByStatus'
})
export class OrderByStatusPipe implements PipeTransform {

	getTodayMinutes() {
		let TodayDate = new Date();
		let m = TodayDate.getMinutes();
		let h = TodayDate.getHours();
		let timeObj = {
			h: h,
			m: m
		}
		return timeObj;
	}

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

	isOpen(swingTime){
		if(!swingTime) return false;
		let timeObj = this.getSwingMinutes(swingTime);
		let timeObjNow = this.getTodayMinutes();
		let dateSwing = new Date(2017, 0, 1,  timeObj.h, timeObj.m); // 9:00 AM
		let midNight = new Date(2017, 0, 1,  0, 0); // MIDNIGHT
		let dateToday = new Date(2017, 0, 1, timeObjNow.h, timeObjNow.m); // 5:00 PM
		if (midNight < dateSwing || (timeObj.h == '00' && timeObj.m == '00')) {
			dateSwing.setDate(dateSwing.getDate() + 1);
		}
		return dateSwing > dateToday;
	}


	transform(array: Array<any>, args: any): Array<any> {
		// console.log(args);
		if (array==null) {
			return null;
		}
		array.sort((a: any, b: any) => {
			a = this.isOpen(a[args]);
			b = this.isOpen(b[args]);
			if (a > b) {
				return -1;
			} else if (a < b) {
				return 1;
			} else {
				return 0;
			}
		});
		return array;
	}
}
