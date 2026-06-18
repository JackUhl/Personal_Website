import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import SelectInputComponent from './SelectInputComponent';

describe('SelectInputComponent', () => {
    it('renders the label', () => {
        render(
            <SelectInputComponent
                label="Content Type"
                value="text"
                options={['text', 'media', 'merv']}
                onChange={vi.fn()}
            />
        );

        expect(screen.getByText('Content Type')).toBeInTheDocument();
    });

    it('renders all provided options', () => {
        render(
            <SelectInputComponent
                value="text"
                options={['text', 'media', 'merv']}
                onChange={vi.fn()}
            />
        );

        expect(screen.getByRole('option', { name: 'text' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'media' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'merv' })).toBeInTheDocument();
    });

    it('renders the selected value', () => {
        render(
            <SelectInputComponent
                value="media"
                options={['text', 'media', 'merv']}
                onChange={vi.fn()}
            />
        );

        expect(screen.getByTestId('select-input')).toHaveValue('media');
    });

    it('calls onChange when selection changes', () => {
        const onChange = vi.fn();

        const Harness = () => {
            const [value, setValue] = useState('text');

            return (
                <SelectInputComponent
                    value={value}
                    options={['text', 'media', 'merv']}
                    onChange={(event) => {
                        onChange(event);
                        setValue(event.target.value);
                    }}
                />
            );
        };

        render(<Harness />);

        fireEvent.change(screen.getByTestId('select-input'), { target: { value: 'merv' } });

        expect(onChange).toHaveBeenCalledOnce();
        expect(onChange.mock.calls[0][0].target.value).toBe('merv');
    });
});