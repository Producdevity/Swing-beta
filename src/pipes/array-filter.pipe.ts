import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "filter"
})
export class ArrayFilterPipe implements PipeTransform {
	public transform(value, key: string, term: string) {
		if (value == null) return null;
		return value.filter((item) => {
			if (item.hasOwnProperty(key)) {
				if (term) {
					let regExp = new RegExp('\\b' + term, 'gi');
					return regExp.test(item[key]);
				} else {
					return true;
				}
			} else {
				return false;
			}
		});
	}
}

