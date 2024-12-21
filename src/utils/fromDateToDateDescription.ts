const fromDateToDateDescription = (date: string) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const dateArray = date.slice(0, 10).split("-");
  const day = parseInt(dateArray[2], 10);
  const month = months[parseInt(dateArray[1], 10) - 1];
  const year = dateArray[0];
  return `${day} de ${month} de ${year}`;
};
export default fromDateToDateDescription;
