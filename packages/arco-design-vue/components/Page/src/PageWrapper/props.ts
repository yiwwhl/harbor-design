import { PropType } from "vue";
import { HeightMode } from "./type";

export const basicProps = {
  title: {
    type: String,
  },
  spaceAround: {
    type: Number,
    default: 12,
  },
  heightMode: {
    type: String as PropType<HeightMode>,
    default: HeightMode.FLEX_FIT,
  },
};
