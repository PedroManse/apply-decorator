type Fn<I extends any[], O> = ((...args: I)=>O);
type DocFn<I extends any[], O> = Fn<I, O> & {doc?: Record<string, string>};

function doc({key, value}:{key: string, value: string}) {
	return function<I extends any[], O>(fn: DocFn<I, O>) {
		fn.doc = fn.doc??{};
		fn.doc[key] = value;
		return fn;
	}
}

function docs(vs: {key: string, value: string}[]) {
	return function<I extends any[], O>(fn: DocFn<I, O>) {
		// *pode* usar `.reverse` para fazer manter o funcionamento exato
		for (const kv of vs.reverse()) {
			doc(kv)(fn);
		}
		return fn;
	}
}

function decorator(..._initParams: any) {
	return function(fn: Function) {
		return fn
	}
}

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
}

const x = new Test();
console.log(x.method1["doc"]);
console.log(x.method2["doc"]);
