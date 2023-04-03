import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Journey from '../components/OneJourney';

describe('Journey component tests', () => {
  const journey = (
    <Journey
      key="123"
      id="111"
      departureStationName="TestDepartureStation"
      departureStationId="10"
      returnStationName="TestReturnStation"
      returnStationId="20"
      distance={200}
      duration={100}
    />
  );

  test('renders journey', () => {
    const component = render(journey);
    expect(component.container).toHaveTextContent(
      'KasarmitoriKaisaniemenpuisto0.20KM1MIN',
    );
  });
});
