import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditResumeDocumentComponent from './EditResumeDocumentComponent';

vi.mock('../../../../services/UploadService/UploadService', () => ({
    UploadService: {
        GetFile: (key: string) => `https://cdn.example.com/${key}`,
        PostUpload: vi.fn(),
    },
}));

describe('EditResumeDocumentComponent', () => {
    it('populates the input with the current resume document value', () => {
        render(
            <EditResumeDocumentComponent
                resumeDocument={{ data: 'resume.pdf' }}
                updateResumeDocument={vi.fn()}
            />
        );

        expect(screen.getByDisplayValue('resume.pdf')).toBeInTheDocument();
    });

    it('calls updateResumeDocument with the updated value when the input changes', () => {
        const updateResumeDocument = vi.fn();
        render(
            <EditResumeDocumentComponent
                resumeDocument={{ data: 'resume.pdf' }}
                updateResumeDocument={updateResumeDocument}
            />
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new-resume.pdf' } });

        expect(updateResumeDocument).toHaveBeenCalledWith({ data: 'new-resume.pdf' });
    });
});
