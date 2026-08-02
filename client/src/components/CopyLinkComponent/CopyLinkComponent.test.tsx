import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import checkmarkSvg from "../../assets/svg/checkmark.svg";
import linkSvg from "../../assets/svg/link.svg";
import CopyLinkComponent from "./CopyLinkComponent";

describe("CopyLinkComponent", () => {
    it("does not show the icon when not hovering", () => {
        render(
            <CopyLinkComponent onClick={() => { }}>
                <p>My Section</p>
            </CopyLinkComponent>,
        );

        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("shows the link icon when hovering", async () => {
        render(
            <CopyLinkComponent onClick={() => { }}>
                <p>My Section</p>
            </CopyLinkComponent>,
        );

        const child = screen.getByText("My Section");
        const container = child.parentElement as HTMLDivElement;

        await userEvent.hover(container);

        expect(screen.getByRole("img")).toHaveAttribute("src", linkSvg);
    });

    it("shows a checkmark icon after clicking while hovering", async () => {
        render(
            <CopyLinkComponent onClick={() => { }}>
                <p>My Section</p>
            </CopyLinkComponent>,
        );

        const child = screen.getByText("My Section");
        const container = child.parentElement as HTMLDivElement;

        await userEvent.hover(container);
        expect(screen.getByRole("img")).toHaveAttribute("src", linkSvg);

        await userEvent.click(child);
        expect(screen.getByRole("img")).toHaveAttribute("src", checkmarkSvg);
    });

    it("hides the icon when the cursor leaves the container", async () => {
        render(
            <CopyLinkComponent onClick={() => { }}>
                <p>My Section</p>
            </CopyLinkComponent>,
        );

        const child = screen.getByText("My Section");
        const container = child.parentElement as HTMLDivElement;

        await userEvent.hover(container);
        await userEvent.unhover(container);

        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
        const onClick = vi.fn();

        render(
            <CopyLinkComponent onClick={onClick}>
                <p>My Section</p>
            </CopyLinkComponent>,
        );

        await userEvent.click(screen.getByText("My Section"));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
