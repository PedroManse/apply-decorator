type Fn<I extends any[], O> = ((...args: I)=>O);
type DocFn<I extends any[], O> = Fn<I, O> & {doc?: Record<string, string>};

export function doc({key, value}:{key: string, value: string}) {
	return function<I extends any[], O>(fn: DocFn<I, O>) {
		fn.doc = fn.doc??{};
		fn.doc[key] = value;
		return fn;
	}
}

export function docs(vs: {key: string, value: string}[]) {
	return function<I extends any[], O>(fn: DocFn<I, O>) {
		// *pode* usar `.reverse` para fazer manter o funcionamento exato
		for (const kv of vs.reverse()) {
			doc(kv)(fn);
		}
		return fn;
	}
}


