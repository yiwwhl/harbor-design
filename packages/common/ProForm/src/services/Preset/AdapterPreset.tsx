import { get, set } from "lodash-es";
import { AdaptedInterfacePreset, AnyObject } from "../../types";
import { IS } from "../../utils";
import { toRaw } from "vue";

function getGeneralField({ parentSchema, schema, index }: AnyObject) {
	return parentSchema
		? `${parentSchema.field}.${index}.${schema.field}`
		: schema.field;
}

const AdapterPreset: AdaptedInterfacePreset = {
	ArcoVue: {
		getRuntimeField(runtimeArgs) {
			const field = getGeneralField(runtimeArgs);
			if (IS.isFunction(field)) {
				return {
					field: field(),
				};
			}
			return {
				field,
			};
		},
		getRuntimeRequired(runtimeArgs: AnyObject) {
			if (runtimeArgs.required) {
				if (!runtimeArgs.rules) {
					runtimeArgs.rules = [];
					runtimeArgs.rules.push({
						required: true,
						message: `${runtimeArgs.label}是必填项`,
					});
				} else {
					const requiredIndex = runtimeArgs.rules.findIndex(
						(rule: AnyObject) => !IS.isUndefined(rule.required),
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = true;
						runtimeArgs.rules[requiredIndex].message =
							`${runtimeArgs.label}是必填项`;
					} else {
						runtimeArgs.rules.unshift({
							required: true,
							message: `${runtimeArgs.label}是必填项`,
						});
					}
				}
			} else {
				if (runtimeArgs.rules) {
					const requiredIndex = runtimeArgs.rules?.findIndex(
						(rule: AnyObject) => !!rule.required,
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = false;
					} else {
						runtimeArgs.rules.unshift({
							required: true,
							message: `${runtimeArgs.label}是必填项`,
						});
					}
				}
			}
			return {
				rules: runtimeArgs.rules,
			};
		},
		getFormModelPropName() {
			return "model";
		},
		formComponentRenderer({
			Component,
			baseModel,
			schema,
			placeholder,
			componentSlots,
			props,
		}) {
			let modelValue: AnyObject;
			if (IS.isFunction(schema.field)) {
				modelValue = get(baseModel, schema.field());
			} else {
				modelValue = baseModel[schema.field];
			}
			return (
				<Component
					modelValue={modelValue}
					onUpdate:modelValue={(newValue: any) => {
						if (IS.isFunction(schema.field)) {
							set(baseModel, schema.field(), newValue);
						} else {
							baseModel[schema.field] = newValue;
						}
					}}
					placeholder={placeholder}
					{...props}
				>
					{{
						...componentSlots,
					}}
				</Component>
			);
		},
		validateForm(runtimeArgs) {
			return new Promise((resolve, reject) => {
				runtimeArgs.runtimeCore.formRef.value.validate((errors: any) => {
					if (errors) {
						return reject(errors);
					}
					return resolve(
						runtimeArgs.cleanFallbackFields(
							toRaw(runtimeArgs.runtimeCore.processor.processedModel.value),
						),
					);
				});
			});
		},
		clearValidate(runtimeArgs) {
			runtimeArgs.formRef.value.clearValidate();
		},
	},
	NutUI: {
		getRuntimeField(runtimeArgs) {
			const prop = getGeneralField(runtimeArgs);
			if (IS.isFunction(prop)) {
				return {
					prop: prop(),
				};
			}
			return {
				prop,
			};
		},
		getRuntimeRequired(runtimeArgs: AnyObject) {
			if (runtimeArgs.required) {
				if (!runtimeArgs.rules) {
					runtimeArgs.rules = [];
					runtimeArgs.rules.push({
						required: true,
						message: `${runtimeArgs.label}是必填项`,
					});
				} else {
					const requiredIndex = runtimeArgs.rules.findIndex(
						(rule: AnyObject) => !IS.isUndefined(rule.required),
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = true;
						runtimeArgs.rules[requiredIndex].message =
							`${runtimeArgs.label}是必填项`;
					} else {
						runtimeArgs.rules.unshift({
							required: true,
							message: `${runtimeArgs.label}是必填项`,
						});
					}
				}
			} else {
				if (runtimeArgs.rules) {
					const requiredIndex = runtimeArgs.rules?.findIndex(
						(rule: AnyObject) => !!rule.required,
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = false;
					} else {
						runtimeArgs.rules.unshift({
							required: true,
							message: `${runtimeArgs.label}是必填项`,
						});
					}
				}
			}
			return {
				rules: runtimeArgs.rules,
				required: runtimeArgs.required,
			};
		},
		getFormModelPropName() {
			return "modelValue";
		},
		formComponentRenderer({
			Component,
			baseModel,
			schema,
			placeholder,
			componentSlots,
			props,
		}) {
			let modelValue: AnyObject;
			if (IS.isFunction(schema.field)) {
				modelValue = get(baseModel, schema.field());
			} else {
				modelValue = baseModel[schema.field];
			}
			return (
				<Component
					modelValue={modelValue}
					onUpdate:modelValue={(newValue: any) => {
						if (IS.isFunction(schema.field)) {
							set(baseModel, schema.field(), newValue);
						} else {
							baseModel[schema.field] = newValue;
						}
					}}
					placeholder={placeholder}
					{...props}
				>
					{{
						...componentSlots,
					}}
				</Component>
			);
		},
		validateForm(runtimeArgs) {
			return new Promise((resolve, reject) => {
				runtimeArgs.runtimeCore.formRef.value
					.validate()
					.then(({ valid, errors }: AnyObject) => {
						if (valid) {
							resolve(
								runtimeArgs.cleanFallbackFields(
									toRaw(runtimeArgs.runtimeCore.processor.processedModel.value),
								),
							);
						} else {
							reject(errors);
						}
					});
			});
		},
		clearValidate(runtimeArgs) {
			runtimeArgs.formRef.value.reset();
		},
	},
	NaiveUI: {
		getRuntimeField(runtimeArgs) {
			const path = getGeneralField(runtimeArgs);
			if (IS.isFunction(path)) {
				return {
					path: path(),
				};
			}
			return {
				path,
			};
		},
		getRuntimeRequired(runtimeArgs: AnyObject) {
			if (runtimeArgs.required) {
				if (!runtimeArgs.rules) {
					runtimeArgs.rules = [];
					runtimeArgs.rules.push({
						required: true,
						message: `${runtimeArgs.label}是必填项`,
						trigger: ["input", "blur"],
					});
				} else {
					const requiredIndex = runtimeArgs.rules.findIndex(
						(rule: AnyObject) => !IS.isUndefined(rule.required),
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = true;
						runtimeArgs.rules[requiredIndex].message =
							`${runtimeArgs.label}是必填项`;
					} else {
						runtimeArgs.rules.unshift({
							required: true,
							message: `${runtimeArgs.label}是必填项`,
							trigger: ["input", "blur"],
						});
					}
				}
			} else {
				if (runtimeArgs.rules) {
					const requiredIndex = runtimeArgs.rules?.findIndex(
						(rule: AnyObject) => !!rule.required,
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = false;
					} else {
						runtimeArgs.rules.unshift({
							required: true,
							message: `${runtimeArgs.label}是必填项`,
							trigger: ["input", "blur"],
						});
					}
				}
			}
			return {
				rule: runtimeArgs.rules,
			};
		},
		getFormModelPropName() {
			return "model";
		},
		formComponentRenderer({
			Component,
			baseModel,
			schema,
			placeholder,
			componentSlots,
			props,
		}) {
			let value: AnyObject;
			if (IS.isFunction(schema.field)) {
				value = get(baseModel, schema.field());
			} else {
				value = baseModel[schema.field];
			}
			return (
				<Component
					value={value}
					onUpdate:value={(newValue: any) => {
						if (IS.isFunction(schema.field)) {
							set(baseModel, schema.field(), newValue);
						} else {
							baseModel[schema.field] = newValue;
						}
					}}
					placeholder={placeholder}
					{...props}
				>
					{{
						...componentSlots,
					}}
				</Component>
			);
		},
		validateForm(runtimeArgs) {
			return new Promise((resolve, reject) => {
				runtimeArgs.runtimeCore.formRef.value.validate((errors: any) => {
					if (errors) {
						return reject(errors);
					}
					return resolve(
						runtimeArgs.cleanFallbackFields(
							toRaw(runtimeArgs.runtimeCore.processor.processedModel.value),
						),
					);
				});
			});
		},
		clearValidate(runtimeArgs) {
			runtimeArgs.formRef.value.restoreValidation();
		},
	},
};

export default AdapterPreset;
