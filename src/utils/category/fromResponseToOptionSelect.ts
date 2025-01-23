import IOptionSelect from "@/interfaces/OptionSelect";
import CategoryResponse from "@/interfaces/responses/Category";

export default (category: CategoryResponse) => {
  return {
    id: category._id,
    name: category.name,
  } as IOptionSelect;
};
