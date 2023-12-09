import { RuntimeOptions } from "../../types";
export default class RuntimeContainer {
    static getFormContainer({ ui }?: RuntimeOptions): import("../../types").DomType;
    static getFormItemContainer({ ui }?: RuntimeOptions): import("../../types").DomType;
    static getItemContainer({ ui }?: RuntimeOptions): import("../../types").DomType;
    static getGroupContainer({ ui }?: RuntimeOptions): import("../../types").DomType;
    static getListContainer({ ui }?: RuntimeOptions): import("../../types").DomType;
    static getListItemContainer({ ui }?: RuntimeOptions): import("../../types").DomType;
}
