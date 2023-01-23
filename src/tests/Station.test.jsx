import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Station from '../components/OneStation';

describe('Station component tests', () => {
  const station = (
    <Station
      key="123"
      id="111"
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
      'testStationFi, adress: testStation, city: testCityFi, operator: testOperator, capasity: 10',
    );
  });
});
