import { defineComponent } from "vue";

export default defineComponent({
	setup(_, { slots }) {
		return () => {
			return (
				<div>
					{slots.header?.()}
					{slots.default?.()}
				</div>
			);
		};
	},
});
