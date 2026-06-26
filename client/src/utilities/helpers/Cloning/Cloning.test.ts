import { describe, it, expect } from "vitest";
import { deepCopy } from "./Cloning";

describe('deepCopy', () => {
    it('returns a value equal to the original object', () => {
        const original = { name: 'Jack', nested: { count: 1 } };

        expect(deepCopy(original)).toEqual(original);
    });

    it('returns a new object and not just a reference to the original object', () => {
        const original = { name: 'Jack' };

        expect(deepCopy(original)).not.toBe(original);
    });
});