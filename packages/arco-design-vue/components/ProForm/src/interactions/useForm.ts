import { FormCustomizer } from "../services";
import { FormCustomization, UseForm } from "../types";

export function useForm(formCustomization: FormCustomization): UseForm {
  const formCustomizer = new FormCustomizer(formCustomization);
  return [formCustomizer.setup.bind(formCustomizer)];
}
