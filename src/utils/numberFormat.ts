export default function formatNumber(number: number): string {
  const symbols: string[] = ["", "K", "M", "B", "T"];
  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let symbolIndex = 0;

  while (number >= 1000 && symbolIndex < symbols.length - 1) {
    number /= 1000;
    symbolIndex++;
  }

  return number?.toFixed(1).replace(regex, "$1") + symbols[symbolIndex];
}
