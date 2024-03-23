export const aabbLeft = (aabb) => {
  return aabb.position.x;
};
export const aabbRight = (aabb) => {
  return aabb.position.x + aabb.width;
};
export const aabbTop = (aabb) => {
  return aabb.position.y;
};
export const aabbBottom = (aabb) => {
  return aabb.position.y + aabb.height;
};

export const hasCollision = (A, B) => {
  if (
    aabbLeft(A) < aabbRight(B) &&
    aabbRight(A) > aabbLeft(B) &&
    aabbTop(A) < aabbBottom(B) &&
    aabbBottom(A) > aabbTop(B)
  ) {
    return true;
  } else {
    return false;
  }
};
