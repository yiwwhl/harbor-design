import { FormCustomization } from "../types";

export default class FormCustomizer {
  constructor(public formCustomization: FormCustomization) {}
  setup() {
    return this.formCustomization;
  }
}
