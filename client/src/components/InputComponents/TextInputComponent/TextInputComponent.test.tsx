import { fireEvent,render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import TextInputComponent from './TextInputComponent';

const createHarness = (onChange: any) => {
    return () => {
        const [value, setValue] = useState('');

        return (
            <TextInputComponent
                label="Test Label"
                value={value}
                onChange={(event) => {
                    onChange(event);
                    setValue(event.target.value);
                }}
            />
        );
    };
};

describe('TextInputComponent', () => {
    it('renders with label and value', () => {
        const onChange = vi.fn();

        render(
            <TextInputComponent
                label="Title"
                value="My title"
                onChange={onChange}
            />
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByTestId('text-input')).toHaveValue('My title');
    });

    it('renders empty value when value is not provided', () => {
        render(
            <TextInputComponent
                label="Optional Value"
                onChange={vi.fn()}
            />
        );

        expect(screen.getByTestId('text-input')).toHaveValue('');
    });

    it('calls onChange when text changes', () => {
        const onChange = vi.fn();
        const Harness = createHarness(onChange);

        render(<Harness />);

        const input = screen.getByTestId('text-input');
        fireEvent.change(input, { target: { value: 'Updated title' } });

        expect(onChange).toHaveBeenCalledOnce();
        expect(onChange.mock.calls[0][0].target.value).toBe('Updated title');
        expect(input).toHaveValue('Updated title');
    });

    it('calls onChange for each change event', () => {
        const onChange = vi.fn();
        const Harness = createHarness(onChange);

        render(<Harness />);

        const input = screen.getByTestId('text-input');

        fireEvent.change(input, { target: { value: 'First' } });
        expect(input).toHaveValue('First');
        expect(onChange).toHaveBeenCalledTimes(1);

        fireEvent.change(input, { target: { value: 'Second' } });
        expect(input).toHaveValue('Second');
        expect(onChange).toHaveBeenCalledTimes(2);
    });
});
