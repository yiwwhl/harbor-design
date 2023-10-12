import { ImageCollector } from "./src/index";

export function ImageAutoLoader(storageNamespace?: string) {
  return {
    install() {
      ImageCollector.collectAllImages(storageNamespace);
    },
  };
}
