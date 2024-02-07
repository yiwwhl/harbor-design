import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { ProForm, useForm } from "@harbor-design/proform";
import { Button, Input, InputPassword } from "@arco-design/web-vue";
import { ProjectService } from "@/architecture/core/ProjectService";
import { useFnCall } from "@/hooks/useFnCall";

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
					label: "用户名",
					field: "username",
					component: Input,
					required: true,
					defaultValue: "demo",
				},
				{
					label: "密码",
					field: "password",
					component: InputPassword,
					required: true,
					defaultValue: "demo",
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
						<div class={styles.prompt}>登录到您的账户</div>
						<ProForm setup={setup} />
						<Button
							type="primary"
							loading={loading.value}
							onClick={handleLogin}
						>
							登录
						</Button>
					</div>
				</div>
			);
		};
	},
});
