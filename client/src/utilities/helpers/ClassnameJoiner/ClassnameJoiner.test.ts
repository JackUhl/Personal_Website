import { describe, expect, it } from "vitest";
import { classNameJoin } from "./ClassnameJoiner";

describe('classNameJoin', () => {
    it('returns a single classname', () => {

        expect(classNameJoin(["test"])).toBe('test');
    });

    it('returns multiple classnames', () => {

        expect(classNameJoin(["test1", "test2"])).toBe('test1 test2');
    });
});