import { applySeveralMut, applySeveralReplace } from "./decorators";
import { doc, docs } from "./doc";
import { Fn } from "./decorators";
import routeDoc from "./route.doc";

export function add(n: number) {
	return function<I extends any[]>(fn: Fn<I, number>): Fn<I, number> {
		return function(...args: I): number {
			return fn(...args)+n
		}
	}
}

class Test {
	@doc({key: "info 1", value: "result"})
	@doc({key: "info 2", value: "result 2"})
	@doc({key: "info 3", value: "result 3"})
	@add(4)
	method1() {
		return 3;
	}

	@docs([
		{key: "info 1", value: "result"},
		{key: "info 2", value: "result 2"},
		{key: "info 3", value: "result 3"},
	])
	method2() { }

	@applySeveralMut([
		[{key: "info 1", value: "result"}],
		[{key: "info 2", value: "result 2"}],
		[{key: "info 3", value: "result 3"}],
	], doc)
	method3() { }

	@doc({key: "description", value: "returns 3"})
	@applySeveralReplace([
		[1],
		[1],
		[1],
	], add)
	method4() {
		return 0;
	}

	@routeDoc()
	method5() { }
}

const x = new Test();
console.log(x.method1);
console.log(x.method2);
console.log(x.method3);
console.log(x.method4);
console.log(x.method5);
