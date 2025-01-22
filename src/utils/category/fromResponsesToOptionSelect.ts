import fromResponseToOptionSelect from "./fromResponseToOptionSelect";
import CategoryResponse from "@/interfaces/responses/Category";

export default (categories: CategoryResponse[]) => {
  return categories.map((category: CategoryResponse) =>
    fromResponseToOptionSelect(category)
  );
};
