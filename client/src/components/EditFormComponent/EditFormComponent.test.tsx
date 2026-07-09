import { fireEvent,render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { InputType } from '../../models/enums/InputType';
import EditFormComponent from './EditFormComponent';

vi.mock('../../services/UploadService/UploadService', () => ({
    UploadService: { GetFile: (key: string) => `http://mocked/${key}` },
}));

type TestForm = {
    name: string;
    description: string;
    tags: string[];
};

const defaultFields = [
    { propertyName: 'name' as keyof TestForm & string, label: 'Name', type: InputType.Text },
    { propertyName: 'description' as keyof TestForm & string, label: 'Description', type: InputType.TextArea },
];

const defaultValues: TestForm = { name: 'Test Name', description: 'Test Desc', tags: [] };

describe('EditFormComponent', () => {
    it('renders text input fields', () => {
        render(
            <EditFormComponent
                fields={[{ propertyName: 'name', label: 'Name', type: InputType.Text }]}
                formValues={defaultValues}
                onChange={vi.fn()}
            />
        );
        expect(screen.getByDisplayValue('Test Name')).toBeDefined();
    });

    it('renders textarea input fields', () => {
        render(
            <EditFormComponent
                fields={[{ propertyName: 'description', label: 'Description', type: InputType.TextArea }]}
                formValues={defaultValues}
                onChange={vi.fn()}
            />
        );
        expect(screen.getByDisplayValue('Test Desc')).toBeDefined();
    });

    it('renders date input fields', () => {
        type DateForm = { date: string };
        render(
            <EditFormComponent<DateForm>
                fields={[{ propertyName: 'date', label: 'Date', type: InputType.Date }]}
                formValues={{ date: '2024-01-01' }}
                onChange={vi.fn()}
            />
        );
        expect(screen.getByDisplayValue('2024-01-01')).toBeDefined();
    });

    it('renders multiple fields', () => {
        render(
            <EditFormComponent
                fields={defaultFields}
                formValues={defaultValues}
                onChange={vi.fn()}
            />
        );
        expect(screen.getByDisplayValue('Test Name')).toBeDefined();
        expect(screen.getByDisplayValue('Test Desc')).toBeDefined();
    });

    it('calls onChange when a text input changes', () => {
        const onChange = vi.fn();
        render(
            <EditFormComponent
                fields={[{ propertyName: 'name', label: 'Name', type: InputType.Text }]}
                formValues={defaultValues}
                onChange={onChange}
            />
        );
        fireEvent.change(screen.getByDisplayValue('Test Name'), { target: { value: 'New Name' } });
        expect(onChange).toHaveBeenCalledOnce();
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'New Name' }));
    });

    it('sets property to undefined when text input is cleared', () => {
        const onChange = vi.fn();
        render(
            <EditFormComponent
                fields={[{ propertyName: 'name', label: 'Name', type: InputType.Text }]}
                formValues={defaultValues}
                onChange={onChange}
            />
        );
        fireEvent.change(screen.getByDisplayValue('Test Name'), { target: { value: '' } });
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: undefined }));
    });

    it('renders array fields with add and delete buttons', () => {
        render(
            <EditFormComponent
                fields={[{ propertyName: 'tags', label: 'Tags', type: InputType.Text }]}
                formValues={{ ...defaultValues, tags: ['tag1', 'tag2'] }}
                onChange={vi.fn()}
            />
        );
        expect(screen.getByDisplayValue('tag1')).toBeDefined();
        expect(screen.getByDisplayValue('tag2')).toBeDefined();
    });

    it('calls onChange with new item when add button is clicked', () => {
        const onChange = vi.fn();
        const { container } = render(
            <EditFormComponent
                fields={[{ propertyName: 'tags', label: 'Tags', type: InputType.Text }]}
                formValues={{ ...defaultValues, tags: ['tag1'] }}
                onChange={onChange}
            />
        );
        const clickableDivs = container.querySelectorAll('[class*="onClickButtonComponent"]');
        fireEvent.click(clickableDivs[clickableDivs.length - 1]);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ tags: ['tag1', ''] }));
    });

    it('calls onChange with item removed when delete button is clicked', () => {
        const onChange = vi.fn();
        const { container } = render(
            <EditFormComponent
                fields={[{ propertyName: 'tags', label: 'Tags', type: InputType.Text }]}
                formValues={{ ...defaultValues, tags: ['tag1', 'tag2'] }}
                onChange={onChange}
            />
        );
        const clickableDivs = container.querySelectorAll('[class*="onClickButtonComponent"]');
        fireEvent.click(clickableDivs[0]);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ tags: ['tag2'] }));
    });
});
