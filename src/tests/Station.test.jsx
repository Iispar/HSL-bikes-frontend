import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Station from '../components/OneStation';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Station component tests', () => {
  const station = (
    <Station
      key="123"
      id={111}
      nameFi="testStationFi"
      nameSwe="testStationSwe"
      adressFi="testStation"
      adressSwe="testLocation"
      cityFi="testCityFi"
      citySwe="testCitySwe"
      operator="testOperator"
      capasity={10}
      x="testX"
      y="testY"
    />
  );

  test('renders station', () => {
    const component = render(station);
    expect(component.container).toHaveTextContent(
      '111testStation, testCityFi10',
    );
  });
});
