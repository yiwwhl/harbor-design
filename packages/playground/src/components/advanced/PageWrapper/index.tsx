import Wrapper from "@/components/basic/Wrapper";
import styles from "./index.module.scss";
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		title: {
			type: String,
			default: undefined,
		},
	},
	setup(props, { slots }) {
		return () => {
			return (
				<Wrapper {...props} class={styles.content}>
					{{
						header() {
							return (
								props.title && (
									<div
										class={[
											styles.content_header,
											slots.default && styles.content_header_border,
										]}
									>
										<div class={styles.content_header_title}>{props.title}</div>
										{slots.headerRight && <div>{slots.headerRight()}</div>}
									</div>
								)
							);
						},
						default() {
							return (
								slots.default && (
									<div class={styles.content_main}>{slots.default()}</div>
								)
							);
						},
					}}
				</Wrapper>
			);
		};
	},
});
