/**
 * Encode a string with the Vigener cipher
 * @param {string} plaintext The message
 * @param {string} keyword The keyword
 */
export function Encode(plaintext, keyword) {
  // Checks if user input is valid.
  // To be valid:
  //   Should not be empty.
  //   String can contain only lower or upper case letters.
  /**
   * Check if a string is valid
   * @param {string} s The string to validate
   * @returns {boolean}
   */
  function IsValid(s) {
    if (s.length == 0) {
      return false;
    }
    for (let index = 0; index < s.length; index++) {
      let code = s.charCodeAt(index);
      if (
        code < "A".charCodeAt(0) ||
        (code > "Z".charCodeAt(0) && code < "a".charCodeAt(0)) ||
        code > "z".charCodeAt(0)
      ) {
        return false;
      }
    }
    return true;
  }

  if (!IsValid(plaintext) || !IsValid(keyword))
    throw new Error("Invalid keyword or message");

  /**
   * @type {number[]}
   */
  const msgArr = [];
  for (const char of plaintext.split("")) {
    const code = char.charCodeAt(0) - 97;
    msgArr.push(code);
  }

  /**
   * @type {number[]}
   */
  const keyArr = [];
  for (let index = 0; index < msgArr.length; index++) {
    const code = keyword.charCodeAt(index % keyword.length) - 97;
    keyArr.push(code);
  }

  let final = "";
  for (let index = 0; index < msgArr.length; index++) {
    final += String.fromCharCode(((keyArr[index] + msgArr[index]) % 26) + 65);
  }
}
