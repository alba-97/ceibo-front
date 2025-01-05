export type EventQueryType = "text" | "category" | "user";

export default interface EventQuery {
  search?: EventQueryType;
  searchTerm?: string;
}
