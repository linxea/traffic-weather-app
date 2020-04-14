import {
  getAlphabeticallySortedArray,
  getDateFormat,
  getTimeFormat,
  getDateAndTimeFormat,
} from "./util";

it("should return alphabetically sorted array", () => {
  const expectedArray = ["a", "b", "c"];
  const array = ["c", "b", "a"];

  expect(getAlphabeticallySortedArray(array)).toEqual(expectedArray);
});

it("should empty array", () => {
  const expectedArray = [];

  expect(getAlphabeticallySortedArray(expectedArray)).toEqual(expectedArray);
});

it("should empty array if no parameter is given", () => {
  const expectedArray = [];

  expect(getAlphabeticallySortedArray()).toEqual(expectedArray);
});

it("should empty array if invalid parameter is given", () => {
  const expectedArray = [];
  const array = "wrong";

  expect(getAlphabeticallySortedArray(array)).toEqual(expectedArray);
});

it("should return the correct date format if one digit date is given", () => {
  const expectedValue = `2020-04-01`;
  const value = new Date("April 1 2020 12:30");

  expect(getDateFormat(value)).toEqual(expectedValue);
});

it("should return the correct date format if two digits are given", () => {
  const expectedValue = `2020-10-11`;
  const value = new Date("October 11 2020 12:30");

  expect(getDateFormat(value)).toEqual(expectedValue);
});

it("should return the correct time format if one digit date is given", () => {
  const expectedValue = `01:01:00`;
  const value = new Date("April 1 2020 01:01");

  expect(getTimeFormat(value)).toEqual(expectedValue);
});

it("should return the correct time format if two digits are given", () => {
  const expectedValue = `23:11:00`;
  const value = new Date("October 11 2020 23:11");

  expect(getTimeFormat(value)).toEqual(expectedValue);
});

it("should return the correct date and time format", () => {
  const expectedValue = `2020-04-01T12:30:00`;
  const value = new Date("April 1 2020 12:30");

  expect(getDateAndTimeFormat(value, value)).toEqual(expectedValue);
});
