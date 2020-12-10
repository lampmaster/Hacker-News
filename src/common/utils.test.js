import {copy, getHostName, isObj, objIsEmpty} from './utils'

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
