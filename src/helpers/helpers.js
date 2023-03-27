const convertToASCII = (str) => {
  const value =
    str
      .split("")
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
      26 +
    65;
  return String.fromCharCode(value);
};

export const validatePin = (pin) => {
  let err = true;
  //check the lenght ==15
  if (pin.length != 15) {
    err = false;
    return;
  }
  const arr = pin.split("-");
  //check the array have 4 parts
  if (arr.length !== 4) {
    err = false;
    return;
  }
  //check the first part is equal to "JN"
  if (arr[0] != "JN") {
    err = false;
    return;
  }

  //check the last part is equal to 2 uppercase letters
  const regexUppercaseLetters = /^[A-Z]{2}$/;
  if (!regexUppercaseLetters.test(arr[3])) {
    err = false;
    return;
  }

  //check that values are numbers
  if (isNaN(arr[1]) || isNaN(arr[2])) {
    err = false;
    return;
  }
  //check the value of each part equal the letter
  const lettersArr = arr[3].split("");
  const firstLetterCount = convertToASCII(arr[1]);
  const secondLetterCount = convertToASCII(arr[2]);

  if (firstLetterCount != lettersArr[0] || secondLetterCount != lettersArr[1]) {
    err = false;
    return;
  }

  return err;
};

export const isOpen = (openTime, closeTime) => {
  const now = new Date();
  const startTime = new Date(now.toDateString() + " " + openTime);
  const endTime = new Date(now.toDateString() + " " + closeTime);
  const currentTime = now.getTime();
  return currentTime >= startTime.getTime() && currentTime <= endTime.getTime();
};
