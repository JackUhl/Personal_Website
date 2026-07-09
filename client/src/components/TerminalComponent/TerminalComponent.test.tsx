import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import TerminalComponent from './TerminalComponent';

describe('TerminalComponent', () => {
    it('renders the provided text', () => {
        render(<TerminalComponent text="hello" />);
        expect(screen.getByText('h')).toBeDefined();
        expect(screen.getByText('e')).toBeDefined();
    });

    it('renders the default prompt with no path', async () => {
        render(<TerminalComponent text="hello" />);
        expect(await screen.findByText((_, el) => el?.textContent === 'C:\\> ')).toBeDefined();
    });

    it('renders the prompt with the provided path', async () => {
        render(<TerminalComponent text="hello" path={"Users\\jack"} />);
        expect(await screen.findByText((_, el) => el?.textContent === 'C:\\Users\\jack> ')).toBeDefined();
    });
});
