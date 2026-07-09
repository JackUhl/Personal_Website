import { render, screen } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import HrefButtonComponent from './HrefButtonComponent';

describe('HrefButtonComponent', () => {
    it('renders children', () => {
        render(<HrefButtonComponent href="/test">Click me</HrefButtonComponent>);
        expect(screen.getByText('Click me')).toBeDefined();
    });

    it('renders with the correct href', () => {
        render(<HrefButtonComponent href="/test">Click me</HrefButtonComponent>);
        expect(screen.getByRole('link').getAttribute('href')).toBe('/test');
    });

    it('does not set target="_blank" by default', () => {
        render(<HrefButtonComponent href="/test">Click me</HrefButtonComponent>);
        expect(screen.getByRole('link').getAttribute('target')).not.toBe('_blank');
    });

    it('sets target="_blank" when openInNewTab is true', () => {
        render(<HrefButtonComponent href="/test" openInNewTab>Click me</HrefButtonComponent>);
        expect(screen.getByRole('link').getAttribute('target')).toBe('_blank');
    });
});
