import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { ProForm, markNativeObject, useForm } from "@harbor-design/proform";
import { Button, Input, InputPassword } from "@arco-design/web-vue";
import { ProjectService } from "@/architecture/core/ProjectService";
import { useFnCall } from "@/hooks/useFnCall";
import { IconLock, IconUser } from "@arco-design/web-vue/es/icon";

export default defineComponent({
	setup() {
		const AuthService = ProjectService.getService("Auth");
		const [call, { loading }] = useFnCall(AuthService.login);
		const [setup, { submit }] = useForm({
			native: {
				props: {
					Form: {
						layout: "vertical",
					},
				},
			},
			schemas: [
				{
					field: "username",
					component: Input,
					defaultValue: "demo",
					placeholder: "username",
					componentSlots: markNativeObject({
						prefix() {
							return <IconUser />;
						},
					}),
				},
				{
					field: "password",
					component: InputPassword,
					defaultValue: "demo",
					placeholder: "password",
					componentSlots: markNativeObject({
						prefix() {
							return <IconLock />;
						},
					}),
				},
			],
		});

		function handleLogin() {
			submit().then((res) => {
				call(res);
			});
		}

		return () => {
			return (
				<div class={styles.loginWrapper}>
					<div class={styles.loginFormWrapper}>
						<div class={styles.prompt}>Harbor Design</div>
						<ProForm setup={setup} />
						<Button
							class={styles.loginBtn}
							type="primary"
							loading={loading.value}
							onClick={handleLogin}
						>
							Log In
						</Button>
					</div>
				</div>
			);
		};
	},
});
