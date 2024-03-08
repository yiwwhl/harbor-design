import { defineComponent } from "vue";

export default defineComponent({
	props: {
		modelValue: {
			type: Object,
		},
	},
	setup(props) {
		return () => (
			<div>
				helo
				{props.modelValue?.value}
			</div>
		);
	},
});
