import { FormCustomizer } from "../services";
import { FormCustomization, UseForm } from "../types";

export function useForm(formCustomization: FormCustomization): UseForm {
	const formCustomizer = new FormCustomizer(formCustomization);
	return [
		formCustomizer.setup.bind(formCustomizer),
		{
			submit: formCustomizer.submit.bind(formCustomizer),
			hydrate: formCustomizer.hydrate.bind(formCustomizer),
			share: formCustomizer.share.bind(formCustomizer),
			subscribeModel: formCustomizer.subscribeModel.bind(formCustomizer),
			resetModel: formCustomizer.resetModel.bind(formCustomizer),
		},
	];
}
