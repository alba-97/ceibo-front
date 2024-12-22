import IOption from "@/interfaces/Option";
import CategoryResponse from "@/interfaces/responses/Category";

export default (category: CategoryResponse) => {
  return {
    key: category.name,
    label: category.name,
    value: category.name,
  } as IOption;
};
