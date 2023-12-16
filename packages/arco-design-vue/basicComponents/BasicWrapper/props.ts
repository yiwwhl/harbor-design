import { PropType } from "vue";
import { HeightMode } from "./type";

export const basicProps = {
	title: {
		type: String,
	},
	spaceAround: {
		type: Number,
	},
	heightMode: {
		type: String as PropType<HeightMode>,
	},
	headerHeight: {
		type: Number,
	},
	headerPadding: {
		type: String,
	},
};
