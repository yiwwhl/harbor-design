import type { RuntimeCore } from "../services";

export type Setup = (runtimeCore: RuntimeCore) => any;

export type UseForm = [
  Setup,
  {
    submit: any;
  }
];
