import { basicProps } from "../../../../basicComponents/BasicWrapper/props";
import BasicWrapper from "../../../../basicComponents/BasicWrapper/index";
import { defineComponent } from "vue";
import { merge } from "lodash";

export default defineComponent({
	props: {
		...basicProps,
	},
	setup(props, { slots }) {
		return () => {
			return (
				<BasicWrapper {...merge({ heightMode: "fixed" }, props)}>
					{{
						...slots,
					}}
				</BasicWrapper>
			);
		};
	},
});
