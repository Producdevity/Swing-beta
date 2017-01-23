import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "filter"
})
export class ArrayFilterPipe implements PipeTransform {
	transform(value, args) {
		if (value==null) {
			return null;
		}
		if (!args[0]) {
			return value;
		} else if (value) {
			return value.filter(item => {
				for (let key in item) {
					if ((typeof item[key] === 'string' || item[key] instanceof String) &&
							(item[key].toLowerCase().indexOf(args[0]) !== -1)) {
						return true;
					}
				}
			});
		}
	}
}
// 	transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {
// 		return items.filter(item => {
// 			for (let field in conditions) {
// 				if (item[field] !== conditions[field]) {
// 					return false;
// 				}
// 			}
// 			return true;
// 		});
// 	}
// }
