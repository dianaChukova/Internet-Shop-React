import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Рендер первой страницы', () => {
  test('успешный рендер кнопки Change Page', () => {
    render(<App />);
    const changePage = screen.getByText(/Change Page/i);
    expect(changePage).toBeInTheDocument();
  });
})