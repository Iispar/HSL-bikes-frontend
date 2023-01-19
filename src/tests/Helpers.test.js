import { getPageFilter, newFilter } from '../components/helpers/filterHelpers'
import '@testing-library/jest-dom/extend-expect'


describe('Helpers tests', () => {
    test('getPageFilter works', () => {
        const resForward = getPageFilter('f', 2, ['sort=-Duration'])
        const resBack = getPageFilter('b', 5, ['Return_station_id=100', 'Duration=200'])
        const resBackBroken = getPageFilter('b', -1, ['Covered_distance=1000'])

        expect(resForward).toStrictEqual(['sort=-Duration', 'skip=20'])
        expect(resBack).toStrictEqual(['Return_station_id=100', 'Duration=200', 'skip=50'])
        expect(resBackBroken).toStrictEqual('null')
      })

    test('newFilter works', () => {
        const res = newFilter(['sort=-Duration', 'skip=10', 'Return_station_id=100'], ['Return_station_id=230'])
        expect(res).toStrictEqual(['sort=-Duration', 'skip=10', 'Return_station_id=230'])
    })
})