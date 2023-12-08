import { readFile, replaceSpelledDigits, replaceNonDigits } from "../utils";

async function day2(data) {
  // split input into lines
  const lines = data.split("\n");
  const calibrationValues = [];
  const checking = [];
  for (const line of lines) {
    // replace the spelled digits by digits
    let candidateValue = replaceSpelledDigits(line);

    // keep only the digits
    candidateValue = replaceNonDigits(candidateValue).split("");

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

    checking.push(`${line},${candidateValue}`);

    calibrationValues.push(candidateValue);
  }

  return calibrationValues.reduce((acc, elem) => acc + elem, 0);
}

function getFirstAndLastValues(str) {
  let result = str
    .split("")
    .filter((value, index, arr) => index === 0 || index === arr.length - 1);
  if (result.length === 1) {
    result.push(result[0]);
  }

  return result.join("");
}

describe("day 2", () => {
  let testData =
    "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";

  let inputData;

  beforeEach(async () => {
    inputData = await readFile("day_1/data.txt");
  });

  test("Should decode calibration document successfully", async () => {
    expect(await day2(testData)).toEqual(281);
    expect(await day2(inputData)).toEqual(55260);
  });

  test("Should substitute spelled digit correctly", () => {
    expect(replaceSpelledDigits("two1nine")).toEqual("219");
    expect(replaceSpelledDigits("eightwothree")).toEqual("823");
    expect(replaceSpelledDigits("abcone2threexyz")).toEqual("abc123xyz");
    expect(replaceSpelledDigits("xtwone3four")).toEqual("x2134");
    expect(replaceSpelledDigits("4nineeightseven2")).toEqual("49872");
    expect(replaceSpelledDigits("zoneight234")).toEqual("z18234");
    expect(replaceSpelledDigits("7pqrstsixteen")).toEqual("7pqrst6teen");
    expect(replaceSpelledDigits("eightwo")).toEqual("82");
  });

  test("Should get first and last values correclty", () => {
    expect(getFirstAndLastValues("12345")).toEqual("15");
    expect(getFirstAndLastValues("9868687686786867858")).toEqual("98");
    expect(getFirstAndLastValues("1")).toEqual("11");
    expect(getFirstAndLastValues("2")).toEqual("22");
  });
});
