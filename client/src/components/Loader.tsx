import { BeatLoader } from "react-spinners";

interface Props {
  size?: "small" | "large";
}

const SizeMap = {
  small: "0.5rem",
  large: "1rem",
};

const Loader = ({ size = "small" }: Props) => (
  <BeatLoader size={SizeMap[size]} color="#6c63ff" />
);

export default Loader;
