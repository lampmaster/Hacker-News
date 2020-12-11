import {copy, debounce, getDate, getHostName, isObj, objIsEmpty} from './utils'

describe('utils functions', () => {
    it('should return true for empty object', () => {
       expect(isObj({})).toBeTruthy();
    });

    it('should return true for null', () => {
        expect(isObj(null)).toBeFalsy();
    });

    it('should return true for non empty object', () => {
        expect(isObj({name: 'Ann', age: 20})).toBeTruthy();
    });

    it('should return false for an Array', () => {
        expect(isObj([])).toBeFalsy();
    });
});

describe('test objIsEmpty function', () => {
    it('should return true for empty object', () => {
        expect(objIsEmpty({})).toBeTruthy();
    });

    it('should return false for non empty object', () => {
        expect(objIsEmpty({name: 'Ann', age: 20})).toBeFalsy();
    })
});

describe('test copy function', () => {
    it('should return false', () => {
        const obj = {
            val: 1,
            node: {
                val: 2,
                node: null
            }
        };
        const isEqual = copy(obj) === obj;

        expect(isEqual).toBeFalsy();
    });
});

describe('test getHostName function', () => {
    it('should return null for undefined url', () => {
        expect(getHostName(undefined)).toBe(null);
    });
});

describe('test getDate function', () => {
    it('should return  for 19.11.2068 at 09:11 for 3123123112', () => {
        expect(getDate(3123123112)).toBe('19.11.2068 at 09:11');
    });

    it('should return "" for null', () => {
        expect(getDate(null)).toBe('');
    });

    it('should return "" for undefined', () => {
        expect(getDate(undefined)).toBe('');
    });

    it('should return "" for object', () => {
        expect(getDate({})).toBe('');
    });

    it('should return "" for not a numbered string', () => {
        expect(getDate('some string')).toBe('');
    });

    it('should return "" for a string', () => {
        expect(getDate('some string')).toBe('');
    });
});

describe('test debounce function', () => {
    it('should be called 1 time', () => {
        jest.useFakeTimers();
        const mockFn = jest.fn();
        const fn = debounce(mockFn, 300);
        for (let i = 0; i < 10; i++) fn();
        jest.runAllTimers();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
