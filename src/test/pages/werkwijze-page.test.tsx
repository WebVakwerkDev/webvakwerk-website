import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WerkwijzePage from '@/pages/WerkwijzePage';

describe('WerkwijzePage', () => {
  it('rendert een h1 heading', () => {
    render(<MemoryRouter><WerkwijzePage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('toont de 3 stappen (01, 02, 03)', () => {
    render(<MemoryRouter><WerkwijzePage /></MemoryRouter>);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('heeft een link naar /aanvraag', () => {
    render(<MemoryRouter><WerkwijzePage /></MemoryRouter>);
    const links = screen.getAllByRole('link');
    expect(links.some((l) => l.getAttribute('href') === '/aanvraag')).toBe(true);
  });
});
