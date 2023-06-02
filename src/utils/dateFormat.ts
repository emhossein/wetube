export default function dateFormat(dateString: string) {
  const date = new Date(dateString);
  const currentDate = new Date();

  const timeElapsed = currentDate.getTime() - date.getTime();

  const hoursElapsed = Math.floor(timeElapsed / (1000 * 60 * 60));
  const daysElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const weeksElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 7));
  const monthsElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 30));
  const yearsElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 365));

  if (yearsElapsed > 0) {
    return yearsElapsed === 1 ? "1 year ago" : yearsElapsed + " years ago";
  } else if (monthsElapsed > 0) {
    return monthsElapsed === 1 ? "1 month ago" : monthsElapsed + " months ago";
  } else if (weeksElapsed > 0) {
    return weeksElapsed === 1 ? "1 week ago" : weeksElapsed + " weeks ago";
  } else if (daysElapsed > 0) {
    return daysElapsed === 1 ? "1 day ago" : daysElapsed + " days ago";
  } else if (hoursElapsed > 0) {
    return hoursElapsed === 1 ? "1 hour ago" : hoursElapsed + " hours ago";
  } else {
    return "Less than an hour ago";
  }
}
