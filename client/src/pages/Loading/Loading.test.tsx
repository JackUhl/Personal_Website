import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import Loading from './Loading';

describe('Loading', () => {
    it('renders the loader data-testid', () => {
        render(<Loading />);
        expect(screen.getByTestId('loader')).toBeDefined();
    });
});
