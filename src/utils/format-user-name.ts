interface FormattedUserInterface {
  displayName: string;
  initial: string;
}

export function getFormattedUser(fullName: string): FormattedUserInterface {
  if (!fullName) return { displayName: '', initial: '' };

  const parts = fullName.trim().split(/\s+/);

  const firstName = parts[0] || '';
  const lastName = parts[1] || '';

  const displayName = lastName ? `${firstName} ${lastName}` : firstName;

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";

  const initials = `${firstInitial}${lastInitial}`;

  return { displayName, initial: initials }
}
