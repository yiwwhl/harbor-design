import { CSSProperties, ref } from "vue";
import { isUndefined } from "lodash";

export function useSetProperty(props: Record<string, any>) {
	const domRef = ref();
	let spaceAround = "24px";
	if (!isUndefined(props.spaceAround)) {
		spaceAround = `${props.spaceAround * 2}px`;
	}
	const pxOfFixedHeight = `60px`;
	const presetByHeightMode: Record<string, CSSProperties> = {
		flex: {
			width: `calc(100% - ${spaceAround})`,
			height: "none",
			overflow: "auto",
		},
		fit: {
			width: `calc(100% - ${spaceAround})`,
			height: `calc(100% - ${spaceAround})`,
			overflow: "scroll",
		},
		fixed: {
			width: `calc(100% - ${spaceAround})`,
			height: `calc(100vh - ${spaceAround} - ${pxOfFixedHeight})`,
			overflow: "scroll",
		},
	};
	const { width, height, overflow } =
		presetByHeightMode[props.heightMode ?? "flex"];

	function setWidth() {
		domRef.value.style.setProperty("--basicwrapper-width", width);
	}

	function setHeight() {
		domRef.value.style.setProperty("--basicwrapper-height", height);
	}

	function setMargin() {
		if (!isUndefined(props.spaceAround)) {
			return domRef.value.style.setProperty(
				"--basicwrapper-margin",
				`${props.spaceAround}px`,
			);
		}
		return domRef.value.style.setProperty("--basicwrapper-margin", `${12}px`);
	}

	function setOverflow() {
		domRef.value.style.setProperty("--basicwrapper-overflow", overflow);
	}

	function setHeaderHeight() {
		if (props.headerHeight) {
			return domRef.value.style.setProperty(
				"--basicwrapper-header-height",
				`${props.headerHeight}px`,
			);
		}
		domRef.value.style.setProperty(
			"--basicwrapper-header-height",
			`${props.title ? 50 : 0}px`,
		);
	}

	function setHeaderPadding() {
		if (props.headerPadding) {
			return domRef.value.style.setProperty(
				"--basicwrapper-header-padding",
				`${props.headerPadding}`,
			);
		}
		domRef.value.style.setProperty("--basicwrapper-header-padding", `0 12px`);
	}

	return {
		domRef,
		setWidth,
		setHeight,
		setMargin,
		setOverflow,
		setHeaderHeight,
		setHeaderPadding,
	};
}
