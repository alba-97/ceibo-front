import IOptionSelect from "@/interfaces/OptionSelect";

export default (options: IOptionSelect[]) => {
  return options.map((option) => option.name);
};
