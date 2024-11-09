import html2canvas from "html2canvas";

export async function generatePreview(element: HTMLDivElement): Promise<string> {
  const canvas = await html2canvas(element, { backgroundColor: "white" });
  return canvas.toDataURL("image/png");
}
