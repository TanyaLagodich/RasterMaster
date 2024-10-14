// refactor types later
export function calcDimensions(
    nodeDimensions: {
        width: number;
        height: number;
    },
    editorDimensions: {
        width: number;
        height: number;
    }
) {
    return {
        width: (nodeDimensions.width / editorDimensions.width) * 100 + "%",
        height: (nodeDimensions.height / editorDimensions.height) * 100 + "%",
    };
}

// refactor types later
export function calcPosition(
    position: { x: number; y: number },
    editorDimensions: { width: number; height: number }
) {
    return {
        x: (position.x / editorDimensions.width) * 100 + "%",
        y: (position.y / editorDimensions.height) * 100 + "%",
    };
}

export function isInsideElement(
    x: number,
    y: number,
    element: { left: number; top: number; width: number; height: number }
) {
    return (
        x >= element.left &&
        x <= element.left + element.width &&
        y >= element.top &&
        y <= element.top + element.height
    );
}
