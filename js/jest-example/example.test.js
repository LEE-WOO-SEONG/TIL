const sum = require('./sum');

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },

  async toBeDivisibleByExternalValue(received) {
    const externalValue = await getExternalValueFromRemoteSource();
    const pass = received % externalValue === 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${externalValue}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be divisible by ${externalValue}`,
        pass: false,
      };
    }
  },
});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('numeric ranges', () => {
  expect(100).toBeWithinRange(90, 110);
  expect(101).not.toBeWithinRange(0, 100);
  expect({ apples: 6, bananas: 3 }).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  });
});

// test('is divisible by external value', async () => {
//   await expect(100).toBeDivisibleByExternalValue();
//   await expect(101).not.toBeDivisibleByExternalValue();
// });

describe;

describe('챕터', () => {
  test('37 to equal 37', () => {
    expect(37).toBe(37);
  });

  it('object to equal object', () => {
    const received = { age: 37 };
    const expected = { age: 37 };
    expect(received).toEqual(expected);
  });
});

// async test

describe('async-test', () => {
  it('promise-resolve-test', async () => {
    function p() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    try {
      const data = await p();
      return expect(data).toBe(37);
    } catch (error) {
      console.log(error);
    }
  });

  it('promise-reject-test', async () => {
    function p() {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('reject Error'));
        }, 1000);
      });
    }

    try {
      await p();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
