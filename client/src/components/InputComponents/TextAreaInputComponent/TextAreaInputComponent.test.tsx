import { fireEvent,render, screen } from '@testing-library/react';
import { useState } from 'react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import TextAreaInputComponent from './TextAreaInputComponent';

const createHarness = (onChange: any) => {
    return () => {
        const [value, setValue] = useState('');

        return (
            <TextAreaInputComponent
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

describe('TextAreaInputComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders with label and value', () => {
        const onChange = vi.fn();

        render(
            <TextAreaInputComponent
                label="Test Label"
                value="Test value"
                onChange={onChange}
            />
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        const textArea = screen.getByTestId('text-area-input') as HTMLTextAreaElement;
        expect(textArea.value).toBe('Test value');
    });

    it('renders with empty value by default', () => {
        const onChange = vi.fn();

        render(
            <TextAreaInputComponent
                label="Comments"
                onChange={onChange}
            />
        );

        const textArea = screen.getByTestId('text-area-input') as HTMLTextAreaElement;
        expect(textArea.value).toBe('');
    });

    it('calls onChange when text is entered', () => {
        const onChange = vi.fn();
        const Harness = createHarness(onChange);

        render(<Harness />);

        const textArea = screen.getByTestId('text-area-input') as HTMLTextAreaElement;
        fireEvent.change(textArea, { target: { value: 'New comment text' } });

        expect(onChange).toHaveBeenCalledOnce();
        expect(textArea.value).toBe('New comment text');
    });

    it('calls onChange multiple times for multiple inputs', () => {
        const onChange = vi.fn();
        const Harness = createHarness(onChange);

        render(<Harness />);

        const textArea = screen.getByTestId('text-area-input') as HTMLTextAreaElement;
        
        fireEvent.change(textArea, { target: { value: 'First' } });
        expect(textArea).toHaveValue('First');
        expect(onChange).toHaveBeenCalledTimes(1);

        fireEvent.change(textArea, { target: { value: 'First Second' } });
        expect(textArea).toHaveValue('First Second');
        expect(onChange).toHaveBeenCalledTimes(2);
    });
});
