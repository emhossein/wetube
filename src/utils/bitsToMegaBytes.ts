export default function bytesToMegabytes(bytes: number) {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2) + " MB";
}
