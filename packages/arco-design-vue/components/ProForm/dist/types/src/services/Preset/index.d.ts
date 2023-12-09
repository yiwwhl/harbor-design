declare const _default: {
    adapters: {
        [x: string]: import("../../types").AdaptedInterface;
    };
    schemaPreset: Record<keyof import("../../types").ItemSchema, any> & {
        children: any;
    };
    componentPropsPreset: import("../../types").AnyObject;
    placeholderPresetByComponentName: {};
};
export default _default;
