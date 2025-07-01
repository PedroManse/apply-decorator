import {doc, docs} from "./doc";
import routeDoc from "./route.doc";

class Test {
	@doc({key: "info 1", value: "result"})
	@doc({key: "info 2", value: "result 2"})
	@doc({key: "info 3", value: "result 3"})
	method1() { }

	@docs([
		{key: "info 1", value: "result"},
		{key: "info 2", value: "result 2"},
		{key: "info 3", value: "result 3"},
	])
	method2() { }

	@routeDoc()
	method3() { }
}

const x = new Test();
console.log(x.method1["doc"]);
console.log(x.method2["doc"]);
console.log(x.method3["doc"]);
