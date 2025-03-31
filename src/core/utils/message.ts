export async function copyText(text: string) {
  if ("clipboard" in navigator) {
    await navigator.clipboard.writeText(text);
  }
}
