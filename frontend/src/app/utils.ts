export const buttonVariants = {
  // primary: '#3cb7d6',
  primary: '#133b45',
  success: '#0B875B',
  danger: '#E13C3C',
  warning: '#F89C1C',
  info: '#0fb9b1',
  secondary: '#F4F5F7'
};

export function isValidEmail(value: any) {
  return /.+@.+\..+/.test(value);
}

export function isRequired(value: any) {
  return ['', null, undefined].indexOf(value) === -1;
}

export function strongPassword(value: any) {
  return (
    /[a-z]/.test(value) && //MARK: checks for a-z
    /[0-9]/.test(value) && //MARK: checks for 0-9
    /\W|_/.test(value) && //MARK: checks for special char
    /[A-Z]/.test(value) && //MARK: checks for capital letterd
    value.length >= 8
  );
}
