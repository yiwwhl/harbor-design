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
			return {
				field,
			};
		},
		getRuntimeRequired(runtimeArgs: AnyObject) {
			if (runtimeArgs.required) {
				if (!runtimeArgs.rules) {
					runtimeArgs.rules = [];
					runtimeArgs.rules?.push({
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
					}
				}
			} else {
				if (runtimeArgs.rules) {
					const requiredIndex = runtimeArgs.rules?.findIndex(
						(rule: AnyObject) => !!rule.required,
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = false;
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
			return (
				<Component
					v-model={baseModel[schema.field]}
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
			return {
				prop,
			};
		},
		getRuntimeRequired(runtimeArgs: AnyObject) {
			if (runtimeArgs.required) {
				if (!runtimeArgs.rules) {
					runtimeArgs.rules = [];
					runtimeArgs.rules?.push({
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
					}
				}
			} else {
				if (runtimeArgs.rules) {
					const requiredIndex = runtimeArgs.rules?.findIndex(
						(rule: AnyObject) => !!rule.required,
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = false;
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
			return (
				<Component
					v-model={baseModel[schema.field]}
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
			return {
				path,
			};
		},
		getRuntimeRequired(runtimeArgs: AnyObject) {
			if (runtimeArgs.required) {
				if (!runtimeArgs.rules) {
					runtimeArgs.rules = [];
					runtimeArgs.rules?.push({
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
					}
				}
			} else {
				if (runtimeArgs.rules) {
					const requiredIndex = runtimeArgs.rules?.findIndex(
						(rule: AnyObject) => !!rule.required,
					);
					if (requiredIndex !== -1) {
						runtimeArgs.rules[requiredIndex].required = false;
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
			return (
				<Component
					v-model:value={baseModel[schema.field]}
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
