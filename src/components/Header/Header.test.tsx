import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders logo and navigation', () => {
    render(<Header onThemeToggle={() => {}} currentTheme="light" />);
    expect(screen.getByText(/Sergey Kutushev/i)).toBeInTheDocument();
    expect(screen.getByText(/Проекты/i)).toBeInTheDocument();
    expect(screen.getByText(/Стек/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
  });

  it('renders resume button', () => {
    render(<Header onThemeToggle={() => {}} currentTheme="light" />);
    expect(screen.getByText(/Резюме PDF/i)).toBeInTheDocument();
  });
});
