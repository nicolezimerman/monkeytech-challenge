const convertToASCII = (str) => {
  //step A: split string and multiply each for 1 o 2
  const stepA = str.split("").map((val, index) => {
    return Number(val) * (isEven(index + 1) ? 2 : 1);
  });

  //Step B: Check if one number is bigger than 9 and reduce to one digit
  const stepB = stepA.map((val) => {
    return val > 9 ? reduceToOneNumber(val) : val;
  });

  //step C: reduce to one number
  const stepC = stepB.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  //step D:  make module of 26 and add 65
  const stepD = (stepC % 26) + 65;
  return String.fromCharCode(stepD);
};

const isEven = (num) => num % 2 === 0;

const reduceToOneNumber = (number) => {
  const result = number
    .toString()
    .split("")
    .reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );
  return result;
};

export const isValidPin = (pin) => {
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
