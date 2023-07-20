export function validateEmail(val: string) {
  let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regEmail.test(val)) return false;

  return true;
}
