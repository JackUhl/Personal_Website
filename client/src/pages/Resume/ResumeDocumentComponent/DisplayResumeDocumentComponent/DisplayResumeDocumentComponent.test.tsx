import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DisplayResumeDocumentComponent from './DisplayResumeDocumentComponent';

vi.mock('../../../../services/UploadService/UploadService', () => ({
    UploadService: {
        GetFile: (key: string) => `https://cdn.example.com/${key}`,
    },
}));

describe('DisplayResumeDocumentComponent', () => {
    it('links to the correct file URL from UploadService', () => {
        render(<DisplayResumeDocumentComponent resumeDocument={{ data: 'resume.pdf' }} />);

        expect(screen.getByRole('link', { name: /view as pdf/i })).toHaveAttribute(
            'href',
            'https://cdn.example.com/resume.pdf'
        );
    });
});
