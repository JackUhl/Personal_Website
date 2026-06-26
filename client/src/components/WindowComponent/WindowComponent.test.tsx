import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WindowComponent from './WindowComponent';
import { WindowStyle } from '../../models/enums/WindowStyles';

describe('WindowComponent', () => {
    it('renders the title in the Ten theme (default)', async () => {
        render(<WindowComponent title="My Window" />);
        expect(await screen.findByText('My Window')).toBeDefined();
    });

    it('renders the title in the XP theme', async () => {
        render(<WindowComponent title="My Window" theme={WindowStyle.Xp} />);
        expect(await screen.findByText('My Window')).toBeDefined();
    });

    it('renders the title in the Seven theme', async () => {
        render(<WindowComponent title="My Window" theme={WindowStyle.Seven} />);
        expect(await screen.findByText('My Window')).toBeDefined();
    });
});
