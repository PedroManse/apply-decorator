type DecoratorReplaceInstance<
	I extends unknown[], O,
	I2 extends unknown[], O2,
> = Fn<[Fn<I, O>], Fn<I2, O2>>
type DecoratorModifyInstance<I extends unknown[], O> = Fn<[Fn<I, O>], void>;

/*
Uma função que recebe os argumentos `I` e retorna `O`. I está encapsulados em
um array para possibilitar que a função recebe vários valores
*/
export type Fn<I extends unknown[], O> = ((...args: I)=>O);

/*
A definição de um decorator que transforma a função que receberá
*/
export type MutDecorator<I extends unknown[], O, D extends unknown[]> = Fn<D, DecoratorModifyInstance<I, O>>;

/*
A definição de um decorator que subistitui a função que receberá. Então,
possivelmente, transformando as suas entradas ou saídas
*/
export type CloneDecorator<
	I extends unknown[], O,
	I2 extends unknown[], O2,
	D extends unknown[]
> = Fn<D, DecoratorReplaceInstance<I, O, I2, O2>>;

/*
Essa função recebe um `decorator` que transforma a funcão e uma lista dos
inputs para esse decorator Os decorators são aplicados da maneira invertida que
o array é mandado, para simular exatamente a aplicão natural de vários decorators
*/
export function applySeveralMut<
	I extends unknown[], O,
	D extends unknown[],
>(entries: D[], decorator: MutDecorator<I, O, D>) {
	return function(fn: Fn<I, O>) {
		for (const entry of entries.reverse()) {
			decorator(...entry)(fn);
		}
		return fn;
	}
}

/*
Essa funcão recebe um `decorator` que subistitui a função que lhe é enviada.
Mas a nova função precisa mantar os mesmos valores de saída e entrada. Da mesma
maneira que `applySeveralMut`, uma lista de inputs é recebida e aplicada de
maneira invertida.
*/
export function applySeveralReplace<
	I extends unknown[], O,
	D extends unknown[],
>(entries: D[], decorator: CloneDecorator<I, O, I, O, D>) {
	return function(fn: Fn<I, O>) {
		for (const entry of entries.reverse()) {
			fn = decorator(...entry)(fn);
		}
		return fn;
	}
}

