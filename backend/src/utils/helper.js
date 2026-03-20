const extractYear = (dob) => {
  const year = dob.split('-')[0];
  if (year.length != 4 || isNaN(year)) {
    throw new Error('Invalid Year Format');
  }
  return dob.slice(0, 4);
};

export const isLegalAge = (dob) => {
  const date = new Date();
  return date.getFullYear() - parseInt(extractYear(dob)) >= 18;
};
