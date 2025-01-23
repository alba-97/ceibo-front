import CategoryResponse from "@/interfaces/responses/Category";
import fromResponseToOption from "./fromResponseToOption";

export default (categories: CategoryResponse[]) => {
  return categories.map((category: CategoryResponse) =>
    fromResponseToOption(category)
  );
};
