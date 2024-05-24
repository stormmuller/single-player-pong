const clamp = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
}

const circleIntersectsRectangle = (circleCenter, circleRadius, rectTopLeft, rectWidth, rectHeight) => {
    const closestX = clamp(circleCenter.x, rectTopLeft.x, rectTopLeft.x + rectWidth);
    const closestY = clamp(circleCenter.y, rectTopLeft.y, rectTopLeft.y + rectHeight);

    const distanceX = circleCenter.x - closestX;
    const distanceY = circleCenter.y - closestY;

    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    return distanceSquared <= circleRadius * circleRadius;
}