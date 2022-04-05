import { Options } from "./Options";

const options = ["scoops", "toppings"];

export default function OrderEntry() {
  return options.map((option) => <Options key={option} optionType={option} />);
}
