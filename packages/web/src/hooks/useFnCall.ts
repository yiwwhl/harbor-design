import { Ref, ref } from "vue";

export function useFnCall(fn: AnyFunction): [
	AnyFunction,
	{
		loading: Ref<boolean>;
	},
] {
	const loading = ref(false);
	function call(...args: any[]) {
		const maybePromise = fn(...args);
		if (maybePromise instanceof Promise) {
			loading.value = true;
			maybePromise.finally(() => {
				loading.value = false;
			});
		}
	}
	return [call, { loading }];
}
