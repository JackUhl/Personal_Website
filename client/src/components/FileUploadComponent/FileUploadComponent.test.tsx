import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import FileUploadComponent from './FileUploadComponent';

const { mockPostFile, mockDeleteFile } = vi.hoisted(() => ({
    mockPostFile: vi.fn(),
    mockDeleteFile: vi.fn(),
}));

vi.mock('../../services/UploadService/UploadService', () => ({
    UploadService: { PostFile: mockPostFile, DeleteFile: mockDeleteFile },
}));

vi.mock('../InputComponents/TextInputComponent/TextInputComponent', () => ({
    default: ({ label }: { label?: string }) => <input aria-label={label ?? 'upload'} onChange={() => {}} />,
}));

const defaultProps = {
    onChange: vi.fn(),
    onUpload: vi.fn(),
    onDelete: vi.fn(),
};

describe('FileUploadComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the Upload button', () => {
        render(<FileUploadComponent {...defaultProps} />);
        expect(screen.getByText('Upload')).toBeDefined();
    });

    it('renders the file input as hidden', () => {
        render(<FileUploadComponent {...defaultProps} />);
        const fileInput = screen.queryByTestId('file-input') as HTMLInputElement;
        expect(fileInput).toBeDefined();
    });

    it('restricts accepted file types when fileExtension is provided', () => {
        render(<FileUploadComponent {...defaultProps} fileExtension=".png" />);
        const fileInput = screen.queryByTestId('file-input') as HTMLInputElement;
        expect(fileInput.getAttribute('accept')).toBe('.png');
    });

    it('calls onUpload with the response url when a file is selected', async () => {
        const onUpload = vi.fn();
        mockPostFile.mockResolvedValue({ data: 'https://example.com/file.png' });

        render(<FileUploadComponent {...defaultProps} onUpload={onUpload} />);
        const fileInput = screen.queryByTestId('file-input') as HTMLInputElement;
        const file = new File(['content'], 'test.png', { type: 'image/png' });

        await userEvent.upload(fileInput, file);

        expect(mockPostFile).toHaveBeenCalledWith(file);
        expect(onUpload).toHaveBeenCalledWith('https://example.com/file.png');
    });

    it('calls DeleteFile and onDelete when delete is clicked and value exists', async () => {
        const onDelete = vi.fn();
        mockDeleteFile.mockResolvedValue({});

        render(<FileUploadComponent {...defaultProps} value="uploaded-file-key" onDelete={onDelete} />);

        await userEvent.click(screen.getByText('Delete'));

        expect(mockDeleteFile).toHaveBeenCalledWith('uploaded-file-key');
        expect(onDelete).toHaveBeenCalled();
    });

    it('does not call DeleteFile or onDelete when delete is clicked without a value', async () => {
        const onDelete = vi.fn();

        render(<FileUploadComponent {...defaultProps} value="" onDelete={onDelete} />);

        await userEvent.click(screen.getByText('Delete'));

        expect(mockDeleteFile).not.toHaveBeenCalled();
        expect(onDelete).not.toHaveBeenCalled();
    });
});
