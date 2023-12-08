import { readFile, replaceNonDigits } from "../utils";

function day1(data) {
  // split input into lines
  const lines = data.split("\n");
  const calibrationValues = [];
  for (const line of lines) {
    // keep only the digits
    let candidateValue = replaceNonDigits(line).split("");

    // make sure only the first and last are kept
    if (candidateValue.length > 0) {
      candidateValue = candidateValue.filter(
        (value, index, arr) => index === 0 || index === arr.length - 1
      );
      if (candidateValue.length === 1) {
        candidateValue = [candidateValue, candidateValue];
      }
      candidateValue = parseInt(candidateValue.join(""));
    } else {
      candidateValue = 0;
    }

    calibrationValues.push(candidateValue);
  }

  return calibrationValues.reduce((acc, elem) => acc + elem, 0);
}

describe("day 1", () => {
  let testData = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";
  let inputData;

  beforeEach(async () => {
    inputData = await readFile("day_1/data.txt");
  });

  test("Should decode calibration document successfully", () => {
    expect(day1(testData)).toEqual(142);
    expect(day1(inputData)).toEqual(55123);
  });
});
