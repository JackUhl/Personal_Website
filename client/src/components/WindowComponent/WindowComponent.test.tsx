import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import { WindowStyle } from '../../models/enums/WindowStyles';
import WindowComponent from './WindowComponent';

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
