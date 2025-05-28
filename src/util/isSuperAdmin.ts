export default function isSuperAdmin(permission: number) {
  if (permission === 1) {
    return true;
  }
  return false;
}
