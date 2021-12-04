const spaceOutPhoneNumber = (phoneNumber) => {
  let spacedNumber = '';
  let number = phoneNumber;

  if (phoneNumber.charAt(0) === '+') {
    spacedNumber = `${phoneNumber.slice(0, 3)} (0)`;
    
    number = phoneNumber.slice(3, phoneNumber.length);
    reg = /^.*?(?<prefix>\d)(?<number>.*)/g.exec(number);
    
    spacedNumber += `${reg?.groups?.prefix} `;
    number = reg?.groups?.number;
  }

  const splitingTel = number.match(/\d{1,2}/g);
  spacedNumber += splitingTel?.join(' ') ?? '';
  return spacedNumber;
};

console.log(spaceOutPhoneNumber('+33(1).34.78.87.33'));
console.log(spaceOutPhoneNumber('+33 (1).34.78.87.33'));
console.log(spaceOutPhoneNumber('+33 1 95 91 35 10'));
console.log(spaceOutPhoneNumber('+33195913510'));
console.log(spaceOutPhoneNumber('0695913510'));
console.log(spaceOutPhoneNumber('06.95.91.35.10'));
console.log(spaceOutPhoneNumber('06 95 91 35 10'));
console.log(spaceOutPhoneNumber('06y95-91)35=10'));
console.log(spaceOutPhoneNumber('0'));
console.log(spaceOutPhoneNumber('unemail@t.com'));
console.log(spaceOutPhoneNumber(''));

const spaceOutPhoneNumber2 = (phoneNumber) => {
  let prefix = '';
  let number = phoneNumber;

  if (phoneNumber.charAt(0) === '+') {
    prefix = `${phoneNumber.slice(0, 3)} (0)${phoneNumber[3]} `;
    number = phoneNumber.slice(4, phoneNumber.length);
  }
  const splitingTel = number.match(/\d{1,2}/g);
  prefix += splitingTel.join(' ');
  return prefix;
};

console.log(spaceOutPhoneNumber2(''))