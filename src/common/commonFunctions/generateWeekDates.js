function formatDate(date) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
}

export default function generateFormattedDateArray(dateRangeString) {
  const dateRangeParts = dateRangeString.split(" - ");
  const startDate = new Date(dateRangeParts[0]);
  const endDate = new Date(dateRangeParts[1]);

  const formattedDateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    formattedDateArray.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return formattedDateArray;
}
