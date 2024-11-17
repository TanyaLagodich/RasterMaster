import { Node, NodeType, Slide } from '@/types';

export function exportToHtml(slides: Slide[]) {
    let htmlContent = '';

    slides.forEach((slide: Slide, idx) => {
        let slideHTML = `
        <div id="${slide.id}" class="slide" style="width: 100vw; height: 100vh; position: relative; border: 1px solid #ccc;"> 
          <h2 style="position: absolute; top: 0; left: 20px;">Слайд № ${idx + 1}</h2>
        `;

        slide.nodes.forEach((node: Node) => {
            switch (node.type) {
                case NodeType.TEXT:
                    slideHTML += `<div class="text-node" style="
                      position: absolute; 
                      top: ${node.positionPercent.y}%; 
                      left: ${node.positionPercent.x}%;">
                      ${node.value}
                    </div>`;
                    break;

                case NodeType.IMAGE:
                    slideHTML += `<img src="${node.src}" class="image-node" style="
                      position: absolute; 
                      top: ${node.positionPercent.y}%; 
                      left: ${node.positionPercent.x}%; 
                      width: ${node.dimensionsPercent.width}%;
                      height: ${node.dimensionsPercent.height}%;
                      border-radius: ${node.style?.borderRadius || '0'};" />`;
                    break;

                case NodeType.IFRAME:
                    slideHTML += `<iframe src="${node.src}" class="iframe-node" style="
                      position: absolute; 
                      top: ${node.positionPercent.y}%; 
                      left: ${node.positionPercent.x}%; 
                      width: ${node.dimensionsPercent.width}%; 
                      height: ${node.dimensionsPercent.height}%;"></iframe>`;
                    break;

                default:
                    break;
            }
        });

        slideHTML += '</div>';
        htmlContent += slideHTML;
    });

    const html = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Presentation</title>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presentation.html';
    link.click();
    URL.revokeObjectURL(url);
}
