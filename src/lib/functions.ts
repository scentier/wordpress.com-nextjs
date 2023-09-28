export function slugDateFormat(d: string): string {
  let date = new Date(d);

  let year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;

  return `${year}/${month}/${day}`;
}

export function excerptText(text: string) {
  let res = text.match("<p.*?>(.*)</p>");
  if (res) {
    let excerpt = "";
    if (res[1].length > 250) {
      excerpt = `${res[1].substring(0, 250)}...`;
    } else {
      excerpt = res[1];
    }
    return excerpt;
  } else {
    return text;
  }
}

export function formatDateToString(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
