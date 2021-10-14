export const captalizedWord = (data) => {
  return data.charAt(0).toUpperCase() + data.slice(1);
}

export const emailFormat = (email) => {
  return email.split("@")[0]
}