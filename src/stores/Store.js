import { observable, computed, action, autorun } from 'mobx';

class AppStore {
	@observable selected = {};
	@observable blocked = false;
	@observable state = false;
	@observable fail = false;
	@observable start = false;
	@observable finish = false;
	@observable complexity = 4;

	constructor() {
		autorun(() => {
			// console.dir('New changes: ' + this.selected);
		});
	}
	deleteByValue(obj, value) {
	    for (var key in obj) {
	        if (obj[key] === value) delete obj[key];
	    }
	}
	@action updateField(index, order) {
		const oldObg = this.selected;
		oldObg[order] = index;
		this.selected = {};
		this.selected = oldObg;
	}
	@action clear(){
		const oldObg = this.selected;
		this.selected = {};
		for(var key in oldObg){
			if (oldObg[key] !== -1) {
				delete oldObg[key];
			}
		}
		this.selected = oldObg;
	}
	@computed get count(){
		return Object.keys(this.selected).length;
	}
	@computed get time(){
		return this.complexity * Math.sqrt(this.complexity);
	}
	@action getKey(index) {
	 	return Object.keys(this.selected).find((key) => {
	 		return this.selected[key] === index
	 	});
	}
	@action removeField(order) {
		delete this.selected[order];
	}
	@action getIsset(index){
		if (Object.values(this.selected).indexOf(index) > -1) {
		   return index;
		}
	}
};

export default new AppStore();
