import React from "react";
import { render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import Search from "./index";
import * as axios from 'axios';

const searchList = [
  {
    meanings: [
      {
        definitions: [
          {
            definition: 'definition 1',
          },
          {
            definition: 'definition 2',
          },          
        ],
      },
    ],
  },
];

jest.mock('axios');

describe('search', () => {
  beforeAll(() => {
    console.error = jest.fn();
  })

  test('checking place holder in the input', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Please enter here')).toBeTruthy();
  });

  test('checking the input with empty text', () => {
    render(<Search />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Please enter a valid text to search')).toBeTruthy();
  });

  test('checking the correct response from api', async () => {
    axios.get.mockImplementation(
      () => Promise.resolve({ data: searchList }),
    );

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('Please enter here'), {
      target: {
        value: 'Dog',
      },
    });

    await new Promise((r) => setTimeout(r, 1000));

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.getByText('definition 2')).toBeTruthy();
    });
  });

  test('checking the api without faild message', async () => {
    axios.get.mockImplementation(
      () => Promise.reject({ response: {} }),
    );

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('Please enter here'), {
      target: {
        value: '',
      },
    });

    await new Promise((r) => setTimeout(r, 1000));

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid text to search')).toBeTruthy();
    });
  });

  test('checking the api with faild message', async () => {
    axios.get.mockImplementation(
      () => Promise.reject({ response: { data: { message: 'No results found' } } }),
    );

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('Please enter here'), {
      target: {
        value: 'Dog',
      },
    });

    await new Promise((r) => setTimeout(r, 1000));

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeTruthy();
    });
  });
})