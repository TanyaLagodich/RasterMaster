import { nanoid } from 'nanoid';
import { NodeStrategy, NodeType, Image } from '@/types';

export class ImageNodeStrategy implements NodeStrategy {
  async addNode(): Promise<Image> {
    const imageNode: Image = {
      id: nanoid(),
      type: NodeType.IMAGE,
      positionPercent: {
        x: 30,
        y: 30,
      },
      dimensionsPercent: {
        width: 20,
        height: 20,
      },
      zIndex: 1,
      src: '',
      style: {
        borderRadius: '0px',
        cover: false,
      },
      isDraggable: true,
    };

    // Открываем выбор файла и обновляем src после загрузки
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    return new Promise((resolve) => {
      fileInput.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();

          reader.onload = (event) => {
            const result = event.target?.result;

            if (typeof result === 'string') {
              imageNode.src = result;
            }

            resolve(imageNode); // Возвращаем узел после загрузки файла
          };

          reader.readAsDataURL(file);
        }
      });

      fileInput.click();
    });
  }

  updateNode(node: Image, newData: Partial<Image>): Image {
    return { ...node, ...newData };
  }
}
