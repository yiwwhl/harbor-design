import AdapterPreset from "./AdapterPreset";
import RuntimePreset from "./RuntimePreset";

export default {
  ...RuntimePreset,
  adapters: {
    ...AdapterPreset,
  },
};
