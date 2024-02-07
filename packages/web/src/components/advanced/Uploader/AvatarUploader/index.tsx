import { FileItem, RequestOption, Upload } from "@arco-design/web-vue";
import { IconEdit } from "@arco-design/web-vue/es/icon";
import { defineComponent, ref, watch } from "vue";
import styles from "./index.module.scss";
import { ProjectService } from "@/architecture/core/ProjectService";
import useUserStore from "@/store/modules/user";

export default defineComponent({
	props: {
		url: String,
	},
	emits: ["update:modelValue"],
	setup(props) {
		const avatar = ref();
		const FileService = ProjectService.getService("File");
		const userStore = useUserStore();

		watch(
			() => avatar.value,
			() => {
				avatar.value = `${props.url}?timestamp=${Date.now()}`;
				userStore.user.avatar = avatar.value;
			},
			{
				immediate: true,
			},
		);

		function handleChange(_: FileItem[], currentFile: FileItem) {
			avatar.value = currentFile.url;
		}

		function handleRequest(options: RequestOption) {
			const formData = new FormData();
			const fileItem = options.fileItem;
			const file = fileItem.file;
			if (file) {
				formData.append("file", file as File);
				formData.append("filePath", "user");
				avatar.value = fileItem.url;
				FileService.upload({
					url: "upload/avatar",
					formData,
				}).then((res) => {
					avatar.value = `${res.data.fileUrl}?timestamp=${Date.now()}`;
					userStore.user.avatar = avatar.value;
				});
			}

			return {
				abort() {},
			};
		}

		return () => {
			return (
				<Upload
					action="/"
					defaultFileList={avatar.value ? [avatar.value] : []}
					showFileList={false}
					onChange={handleChange}
					customRequest={handleRequest}
				>
					{{
						"upload-button"() {
							return (
								<div
									class={[
										styles.avatarUploaderWrapper,
										`arco-upload-list-item${
											avatar.value && avatar.value?.status === "error"
												? " arco-upload-list-item-error"
												: ""
										}`,
									]}
								>
									<div class="arco-upload-list-picture-mask">
										<IconEdit />
									</div>
									<img class={styles.avatar} src={`${avatar.value}`} />
								</div>
							);
						},
					}}
				</Upload>
			);
		};
	},
});
