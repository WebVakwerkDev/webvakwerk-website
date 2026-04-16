import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrijzenPage from '@/pages/PrijzenPage';

describe('PrijzenPage', () => {
  it('rendert een h1 heading', () => {
    render(<MemoryRouter><PrijzenPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('toont alle drie pakketten', () => {
    render(<MemoryRouter><PrijzenPage /></MemoryRouter>);
    expect(screen.getAllByText('Snel vindbaar').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Optimaal vindbaar').length).toBeGreaterThan(0);
    expect(screen.getByText('Op maat')).toBeInTheDocument();
  });

  it('toont onderhoudsprijzen', () => {
    render(<MemoryRouter><PrijzenPage /></MemoryRouter>);
    expect(screen.getByText('€29')).toBeInTheDocument();
    expect(screen.getByText('€69')).toBeInTheDocument();
  });
});
