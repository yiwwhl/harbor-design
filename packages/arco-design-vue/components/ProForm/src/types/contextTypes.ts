import { AnyObject } from "./utilTypes";

export type DomType = new (...args: any) => AnyObject & {
  $props: AnyObject;
};

export interface RuntimeDomCustomizer {
  Form: DomType;
  FormItem: DomType;
}
