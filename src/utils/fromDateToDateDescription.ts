const fromDateToDateDescription = (date: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateArray = date.slice(0, 10).split("-");
  const day = parseInt(dateArray[2], 10);
  const month = months[parseInt(dateArray[1], 10) - 1];
  const year = dateArray[0];
  return `${month} ${day}, ${year}`;
};
export default fromDateToDateDescription;
