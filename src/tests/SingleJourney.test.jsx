import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import SingleJourney from '../components/SingleJourney';

describe('Journey component tests', () => {
  const journey = (
    <SingleJourney
      key="123"
      departureStationName="TestDepartureStation"
      returnStationName="TestReturnStation"
      coveredDistance={200}
      duration={100}
      direction="return"
    />
  );

  test('renders journey', () => {
    const component = render(journey);
    expect(component.container).toHaveTextContent(
      'FROM TestDepartureStation0.20KM1MIN',
    );
  });
});
