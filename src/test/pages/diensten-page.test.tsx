import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DienstenPage from '@/pages/DienstenPage';

describe('DienstenPage', () => {
  it('toont de webdiensten sectie', () => {
    render(<MemoryRouter><DienstenPage /></MemoryRouter>);
    expect(screen.getByText('Website op maat')).toBeInTheDocument();
  });

  it('toont de overige diensten sectie', () => {
    render(<MemoryRouter><DienstenPage /></MemoryRouter>);
    expect(screen.getByText('Hosting & infrastructuur')).toBeInTheDocument();
  });

  it('rendert een h1 heading', () => {
    render(<MemoryRouter><DienstenPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
