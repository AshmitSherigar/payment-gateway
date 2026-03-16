const extractYear = (dob) => {
  // better to include safety checks here
  return dob.slice(0, 4);
};
export const isLegalAge = () => {
  const date = new Date();
  return date.getFullYear() - parseInt(extractYear('2006-04-07')) >= 18;
};