import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Journey from '../components/OneJourney';

describe('Journey component tests', () => {
  const journey = (
    <Journey
      key="123"
      departureStationName="TestDepartureStation"
      returnStationName="TestReturnStation"
      distance={200}
      duration={100}
    />
  );

  test('renders journey', () => {
    const component = render(journey);
    expect(component.container).toHaveTextContent(
      'Departure station: TestDepartureStation, Return station: TestReturnStation, Distance: 200, Duration: 100',
    );
  });
});
