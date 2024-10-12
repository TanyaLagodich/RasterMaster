export function calcDimension(nodeDimension: number, editorDimension: number) {
    return (nodeDimension / editorDimension) * 100 + "%";
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
