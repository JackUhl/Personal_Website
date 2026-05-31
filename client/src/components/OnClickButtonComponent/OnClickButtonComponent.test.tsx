import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OnClickButtonComponent from './OnButtonButtonComponent';

describe('OnClickButtonComponent', () => {
  it('renders its children', () => {
    render(<OnClickButtonComponent onClick={() => {}}>Click me</OnClickButtonComponent>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows "Loading" while submitting instead of children', () => {
    render(
      <OnClickButtonComponent onClick={() => {}} isSubmitting>
        Click me
      </OnClickButtonComponent>,
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<OnClickButtonComponent onClick={onClick}>Click me</OnClickButtonComponent>);

    await userEvent.click(screen.getByText('Click me'));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
