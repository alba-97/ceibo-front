import IOption from "@/interfaces/Option";

export default (options: IOption[]) => {
  return options.map((option) => option.value);
};
