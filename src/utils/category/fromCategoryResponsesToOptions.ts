import fromCategoryResponseToOption from "./fromCategoryResponseToOption";
import CategoryResponse from "@/interfaces/responses/Category";

export default (categories: CategoryResponse[]) => {
  return categories.map((category: CategoryResponse) =>
    fromCategoryResponseToOption(category)
  );
};
