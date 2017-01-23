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
					// console.log(`item ${item}`);
					// console.log(`key ${key}`);
					if ((typeof item[key] === 'string' || item[key] instanceof String) &&
							(item[key].toLowerCase().indexOf(args[0]) !== -1)) {
						return true;
					}
				}
			});
		}
	}
}

