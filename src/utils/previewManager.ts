import { toPng } from 'html-to-image';

interface Slide {
    id: string;
    backgroundColor: string;
    nodes: any[]; // Узлы слайда
}

/**
 * Фильтр для исключения ненужных DOM-узлов.
 */
const defaultFilter = (node: HTMLElement) => {
    if (/resizeDot/.test(node.className) || node.classList?.contains('ql-toolbar')) {
        return false;
    }
    return true;
};

/**
 * Генерация превью одного слайда.
 *
 * @param element - HTML-элемент редактора
 * @param slide - Данные слайда
 * @returns URL превью в формате DataURL
 */
async function generateSlidePreview(element: HTMLElement, slide: Slide): Promise<string> {
    const editorClone = element.cloneNode(true) as HTMLElement;

    // Настраиваем фон
    editorClone.style.backgroundColor = slide.backgroundColor;

    // Генерация PNG
    return await toPng(editorClone, { filter: defaultFilter });
}

/**
 * Генерация превью для нескольких слайдов.
 *
 * @param slides - Массив слайдов
 * @param editorElement - HTML-элемент редактора
 * @param updatePreviewCallback - Колбек для обновления превью
 */
async function generatePreviewsForSlides(
    slides: Slide[],
    editorElement: HTMLElement,
    updatePreviewCallback: (slideId: string, previewUrl: string) => void
): Promise<void> {
    for (const slide of slides) {
        const dataUrl = await generateSlidePreview(editorElement, slide);
        updatePreviewCallback(slide.id, dataUrl);
    }
}

export { generateSlidePreview, generatePreviewsForSlides };
