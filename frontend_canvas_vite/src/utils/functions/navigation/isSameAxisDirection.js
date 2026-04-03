export function isSameAxisDirection(app, dirA, dirB) {
  console.log("isSameAxisDirection", dirA, dirB);

  const vertical = ["north", "south"];
  const horizontal = ["east", "west"];
  if (!dirA || !dirB) {
    return false;
  }
  if (vertical.includes(dirA) && vertical.includes(dirB)) {
    return true;
  }
  if (horizontal.includes(dirA) && horizontal.includes(dirB)) {
    return true;
  }
  return false;
}
