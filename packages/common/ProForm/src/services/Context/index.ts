import { reactive, ref } from "vue";
import { FormPresets, ProFormLocalePack, UIName } from "../../types";

export default class Context {
	static presets: FormPresets;
	static localePackCache = reactive<Record<string, ProFormLocalePack>>({});
	static localePackPromiseCache = new Map<
		string,
		Promise<ProFormLocalePack | undefined>
	>();
	static internalI18nVersion = ref(0);

	static setPresets(presets: FormPresets) {
		this.presets = presets;
		const locale = presets.i18n?.localeRef?.value;
		if (locale) {
			void this.ensureLocalePackLoaded(locale);
		}
	}

	static getPreset(ui: UIName) {
		if (this.presets.uiPresets?.[ui]?.extend) {
			return this.presets.uiPresets[this.presets.uiPresets[ui]?.extend!];
		}
		return this.presets.uiPresets[ui];
	}
	static getUI(ui: UIName): UIName {
		if (this.presets.uiPresets?.[ui]?.extend) {
			return this.presets.uiPresets[ui]?.extend!;
		}
		return ui;
	}

	static getI18nConfig() {
		return this.presets?.i18n;
	}

	static getCurrentLocale() {
		return this.getI18nConfig()?.localeRef?.value ?? "";
	}

	static getLocalePack(locale = this.getCurrentLocale()) {
		const config = this.getI18nConfig();
		config?.versionRef?.value;
		this.internalI18nVersion.value;
		if (!locale) {
			return undefined;
		}
		void this.ensureLocalePackLoaded(locale);
		return this.localePackCache[locale];
	}

	static async ensureLocalePackLoaded(locale = this.getCurrentLocale()) {
		const config = this.getI18nConfig();
		if (!config?.loadLocalePack || !locale) {
			return this.localePackCache[locale];
		}
		if (this.localePackCache[locale]) {
			return this.localePackCache[locale];
		}
		const pending = this.localePackPromiseCache.get(locale);
		if (pending) {
			return pending;
		}
		const task = config
			.loadLocalePack(locale)
			.then((pack: any) => {
				if (pack) {
					this.localePackCache[locale] = pack;
				}
				return this.localePackCache[locale];
			})
			.catch(() => {
				return undefined;
			})
			.finally(() => {
				this.localePackPromiseCache.delete(locale);
				this.internalI18nVersion.value += 1;
			});
		this.localePackPromiseCache.set(locale, task);
		return task;
	}

	static formatTemplate(
		template: string,
		values: Record<string, string | number | undefined>,
	) {
		return Object.entries(values).reduce((result, [key, value]) => {
			return result.split(`{${key}}`).join(`${value ?? ""}`);
		}, template);
	}

	static translateMessage(message?: string) {
		if (!message) {
			return message ?? "";
		}
		const pack = this.getLocalePack();
		return pack?.messages?.[message] ?? message;
	}

	static translateLabel(label?: string) {
		if (!label) {
			return label ?? "";
		}
		const locale = this.getCurrentLocale();
		const pack = this.getLocalePack(locale);
		return (
			this.getI18nConfig()?.translateLabel?.(label, {
				locale,
				pack,
			}) ??
			pack?.messages?.[label] ??
			label
		);
	}

	static buildRequiredMessage(label?: string) {
		const translatedLabel = this.translateLabel(label);
		const pack = this.getLocalePack();
		const template = pack?.templates?.required;
		if (!template) {
			return `${translatedLabel}是必填项`;
		}
		return this.formatTemplate(template, {
			label: translatedLabel,
		});
	}

	static buildPlaceholder(
		componentName: string | undefined,
		label?: string,
		defaultPrefixMap?: Record<string, string>,
	) {
		const translatedLabel = this.translateLabel(label);
		const pack = this.getLocalePack();
		const placeholderPrefixByComponentName =
			pack?.placeholderPrefixByComponentName ?? defaultPrefixMap ?? {};
		let prefix = this.translateMessage("请输入") || "请输入";
		if (!componentName) {
			return this.applyPlaceholderTemplate(prefix, translatedLabel);
		}
		const normalizedName = componentName.toLowerCase();
		if (placeholderPrefixByComponentName[normalizedName]) {
			prefix = placeholderPrefixByComponentName[normalizedName]!;
			return this.applyPlaceholderTemplate(prefix, translatedLabel);
		}
		Object.keys(placeholderPrefixByComponentName).forEach((name) => {
			if (normalizedName.includes(name.toLowerCase())) {
				prefix = placeholderPrefixByComponentName[name]!;
			}
		});
		return this.applyPlaceholderTemplate(prefix, translatedLabel);
	}

	static applyPlaceholderTemplate(prefix: string, label: string) {
		const pack = this.getLocalePack();
		const template = pack?.templates?.placeholder;
		if (!template) {
			return `${prefix}${label}`;
		}
		return this.formatTemplate(template, {
			prefix,
			label,
		});
	}
}
