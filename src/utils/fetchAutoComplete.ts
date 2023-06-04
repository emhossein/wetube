import axios from "axios";

export function convertTextToJson(text: string) {
  const startIndex = text.indexOf("[");
  const endIndex = text.lastIndexOf("]") + 1;
  const extractedData = text.slice(startIndex, endIndex);
  const json = JSON.parse(extractedData);

  return json;
}

export default async function fetchAutoComplete(value: string) {
  const url = `https://clients1.google.com/complete/search?client=youtube&q=${value}`;

  try {
    const response = await axios.get(url);
    const text = response.data;
    const jsonData = convertTextToJson(text);
    console.log(jsonData);
  } catch (error) {
    console.error("Error: could not fetch data");
  }
}
