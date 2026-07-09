import { fireEvent,render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import DateInputComponent from './DateInputComponent';

const createHarness = (onChange: any) => {
    return () => {
        const [value, setValue] = useState('2026-06-10');

        return (
            <DateInputComponent
                label="Published"
                value={value}
                onChange={(event) => {
                    onChange(event);
                    setValue(event.target.value);
                }}
            />
        );
    };
};

describe('DateInputComponent', () => {
    it('renders with label', () => {
        render(
            <DateInputComponent
                label="Publish Date"
                value="2026-06-17"
                onChange={vi.fn()}
            />
        );

        expect(screen.getByText('Publish Date')).toBeInTheDocument();
    });

    it('formats provided value to yyyy-mm-dd', () => {
        render(
            <DateInputComponent
                value="2026-06-17T15:30:00.000Z"
                onChange={vi.fn()}
            />
        );

        expect(screen.getByTestId('date-input')).toHaveValue('2026-06-17');
    });

    it('renders empty value when value is not provided', () => {
        render(
            <DateInputComponent
                label="Optional Date"
                onChange={vi.fn()}
            />
        );

        expect(screen.getByTestId('date-input')).toHaveValue('');
    });

    it('calls onChange when date changes', () => {
        const onChange = vi.fn();
        const Harness = createHarness(onChange);

        render(<Harness />);

        const input = screen.getByTestId('date-input');
        fireEvent.change(input, { target: { value: '2026-06-20' } });

        expect(onChange).toHaveBeenCalledOnce();
        expect(onChange.mock.calls[0][0].target.value).toBe('2026-06-20');
        expect(input).toHaveValue('2026-06-20');
    });
});
