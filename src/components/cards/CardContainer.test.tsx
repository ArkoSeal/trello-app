import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import CardContext, { CardContextProvider } from '../../store/card-context';
import CardContainer from './CardContainer';

describe('With React Testing Library', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

  it('Test Add Column button present', () => {
    const { getByRole } = render(<CardContainer />);
    const button = getByRole('button', { name: /Add Column/i });
    expect(button).toBeInTheDocument();
  });

  it('Test addColumn is not called when label is empty', () => {
    const { getByRole } = render(<CardContainer />);
    const addColumn = jest.fn();

    const button = getByRole('button', { name: /Add Column/i });
    userEvent.click(button);
    expect(addColumn).not.toHaveBeenCalled();
  });
  
})
