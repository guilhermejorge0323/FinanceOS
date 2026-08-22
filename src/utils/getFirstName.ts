export function getFirstName(fullName?: string): string {
  if (!fullName) return 'user';
  return fullName.trim().split(' ')[0];
}
