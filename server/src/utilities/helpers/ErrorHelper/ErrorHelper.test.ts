import { describe, expect, it } from "vitest";

import { HasErrorName } from "./ErrorHelper";

describe("HasErrorName", () => {
    it("returns true when the error is an Error with the matching name", () => {
        const error = new Error("forbidden");
        error.name = "AccessDenied";

        const result = HasErrorName(error, "AccessDenied");

        expect(result).toBe(true);
    });

    it("returns false when the error name does not match", () => {
        const error = new Error("missing");
        error.name = "NoSuchKey";

        const result = HasErrorName(error, "AccessDenied");

        expect(result).toBe(false);
    });

    it("returns false when the input is not an Error instance", () => {
        const result = HasErrorName({ name: "AccessDenied" }, "AccessDenied");

        expect(result).toBe(false);
    });
});
