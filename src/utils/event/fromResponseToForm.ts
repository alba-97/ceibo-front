import EventResponse from "@/interfaces/responses/Event";

export default (event: EventResponse) => {
  return {
    title: event.title ?? "",
    description: event.description ?? "",
    location: event.location ?? "",
    start_date: `${event.start_date ?? ""}`,
    end_date: `${event.end_date ?? ""}`,
    img: event.img ?? "",
    min_age: `${event.min_age ?? ""}`,
    max_age: `${event.max_age ?? ""}`,
    min_to_pay: `${event.min_to_pay ?? ""}`,
    total_to_pay: `${event.total_to_pay ?? ""}`,
    category: event.category.name ?? "",
    link_to_pay: event.link_to_pay ?? "",
    private: event.private ?? "",
  };
};
