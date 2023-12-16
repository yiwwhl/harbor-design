import { getLocalItem, setLocalItem } from "@/utils/Storage";
import { GlobModuleType, ImageStore } from "./type";

let IMAGE_STORE_NAME = "images";

function getImageName(name: string) {
	return name.split("/").at(-1)?.split(".").at(-2)!;
}
function getImageAbsolutePath(module: GlobModuleType) {
	return module.default;
}

function retriveCached() {
	const storeImages = getLocalItem(IMAGE_STORE_NAME);
	ImageCollector.imageStore = Object.assign(
		ImageCollector.imageStore,
		storeImages,
	);
}

export class ImageCollector {
	static imageStore: ImageStore = {};

	static collectAllImages(storageNamespace: string = "") {
		storageNamespace !== "" && (IMAGE_STORE_NAME = storageNamespace);

		retriveCached();

		const images_png = import.meta.glob("@/assets/image/**/*.png", {
			eager: true,
		});

		const images_jpg = import.meta.glob("@/assets/image/**/*.jpg", {
			eager: true,
		});

		const allLoadedImages = Object.assign(images_jpg, images_png) as Record<
			string,
			GlobModuleType
		>;
		Object.keys(allLoadedImages).forEach((relativePath: string) => {
			this.imageStore[getImageName(relativePath)] = getImageAbsolutePath(
				allLoadedImages[relativePath],
			);
		});
		setLocalItem(IMAGE_STORE_NAME, this.imageStore);
	}

	static getImage(imageName: string) {
		return this.imageStore[imageName];
	}
}

export const getImage = ImageCollector.getImage.bind(ImageCollector);
