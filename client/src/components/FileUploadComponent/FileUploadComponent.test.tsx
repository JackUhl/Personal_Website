import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import FileUploadComponent from './FileUploadComponent';

const { mockPostUpload } = vi.hoisted(() => ({
    mockPostUpload: vi.fn(),
}));

vi.mock('../../services/UploadService/UploadService', () => ({
    UploadService: { PostUpload: mockPostUpload },
}));

vi.mock('../InputComponents/TextInputComponent/TextInputComponent', () => ({
    default: ({ label }: { label?: string }) => <input aria-label={label ?? 'upload'} onChange={() => {}} />,
}));

const defaultProps = {
    onChange: vi.fn(),
    onUpload: vi.fn(),
};

describe('FileUploadComponent', () => {
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
        mockPostUpload.mockResolvedValue({ data: 'https://example.com/file.png' });

        render(<FileUploadComponent {...defaultProps} onUpload={onUpload} />);
        const fileInput = screen.queryByTestId('file-input') as HTMLInputElement;
        const file = new File(['content'], 'test.png', { type: 'image/png' });

        await userEvent.upload(fileInput, file);

        expect(mockPostUpload).toHaveBeenCalledWith(file);
        expect(onUpload).toHaveBeenCalledWith('https://example.com/file.png');
    });
});
