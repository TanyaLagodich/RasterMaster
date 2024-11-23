import ReactDOM from 'react-dom/client';
import domtoimage from 'dom-to-image-more';
import { BaseText } from '@/components/text/ui/base-text';
import { Slide, Node } from '@/types';

/**
 * Генерация превью для слайда.
 *
 * @param slide - Данные слайда
 * @param updatePreviewCallback - Колбек для обновления превью
 */
export async function generateSlidePreview(
    slide: Slide,
    updatePreviewCallback: (id: string, blob: Blob) => void
): Promise<void> {
    // Создаём временный контейнер
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = `${slide.editorDimensions?.width || 800}px`;
    tempContainer.style.height = `${slide.editorDimensions?.height || 600}px`;
    tempContainer.style.backgroundColor = slide.backgroundColor;

    document.body.appendChild(tempContainer);

    try {
        // Рендерим каждый узел слайда
        for (const node of slide.nodes) {
            const renderedNode = renderNode(node);
            tempContainer.appendChild(renderedNode);
        }

        // Генерация изображения через dom-to-image-more
        const blob = await domtoimage.toBlob(tempContainer, {
            filter: (node) => {
                if (/resizeDot/.test(node.className) || node.classList?.contains('ql-toolbar')) {
                    return false;
                }
                return true;
            },
            style: {
                fontFamily: 'inherit', // Устанавливаем "унаследованные" шрифты
            },
        });

        if (blob) {
            // Передаём Blob в колбек
            updatePreviewCallback(slide.id, blob);
        } else {
            console.error('Failed to generate Blob from container.');
        }
    } catch (error) {
        console.error('Error generating preview:', error);
    } finally {
        // Удаляем временный контейнер после завершения
        document.body.removeChild(tempContainer);
    }
}

/**
 * Рендер узла слайда.
 *
 * @param node - Узел слайда
 * @returns HTMLElement - Элемент DOM для узла
 */
function renderNode(node: Node): HTMLElement {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = `${node.positionPercent.y}%`;
    container.style.left = `${node.positionPercent.x}%`;
    container.style.width = `${node.dimensionsPercent.width}%`;
    container.style.height = `${node.dimensionsPercent.height}%`;

    switch (node.type) {
        case 'text': {
            // Рендерим текстовый узел с помощью ReactDOM
            const textNode = document.createElement('div');
            textNode.className = 'ql-editor'; // Убедитесь, что стили для Quill доступны
            textNode.innerHTML = node.value || ''; // Содержимое из Quill
            container.appendChild(textNode);
            break;
        }
        case 'image': {
            const img = document.createElement('img');
            img.src = node.src;
            img.style.width = '100%';
            img.style.height = '100%';
            container.appendChild(img);
            break;
        }
        case 'iframe': {
            const iframe = document.createElement('iframe');
            iframe.src = node.src;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            container.appendChild(iframe);
            break;
        }
        default:
            console.warn(`Unsupported node type: ${node.type}`);
            break;
    }

    return container;
}
