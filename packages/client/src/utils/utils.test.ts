import {
  addParam,
  enumToObject,
  findAndMerge,
  sliceAndTranspose,
} from './popular';

import { add, always, propEq } from 'ramda';
import { calcDates, dayOfWeekToDate } from './dates';
import { isCheck } from './validate';
import { configInitialState } from '../context';
import { DaysOfWeek } from '../types/enums';
import { multipledParts, cartesianCondition } from '../business';
import dayjs from 'dayjs';

it(
  'calcDates',
  () => {
    expect(calcDates(
      dayjs('2022-05-22'),
      10,
      [
        1,
        1,
        2
      ]
    ))
      .toEqual([
        '23.05.2022',
        '24.05.2022',
        '26.05.2022',
        '27.05.2022',
        '28.05.2022',
        '30.05.2022',
        '31.05.2022',
        '01.06.2022',
        '03.06.2022',
        '04.06.2022',
      ]);
  }
);

it(
  'enumToObject',
  () => {
    expect(enumToObject(DaysOfWeek))
      .toEqual({
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
      });
  }
);

it(
  'findAndMerge',
  () => {
    expect(findAndMerge(
      [
        { test: 'a' },
        { test: 'b' },
        { test: 'c' }
      ],
      { test: 'c', prop: 'add' },
      'test'
    ))
      .toEqual([
        { test: 'a' },
        { test: 'b' },
        { test: 'c', prop: 'add' }
      ]);
  }
);

it(
  'multipledParts',
  () => {
    expect(multipledParts([
      [
        'a',
        'b',
        'c'
      ],
      [
        'd',
        'e'
      ],
      [
        'f',
        'g'
      ],
    ]))
      .toEqual([
        [
          'a',
          'd',
          'f'
        ],
        [
          'a',
          'd',
          'g'
        ],
        [
          'a',
          'e',
          'f'
        ],
        [
          'a',
          'e',
          'g'
        ],
        [
          'b',
          'd',
          'f'
        ],
        [
          'b',
          'd',
          'g'
        ],
        [
          'b',
          'e',
          'f'
        ],
        [
          'b',
          'e',
          'g'
        ],
        [
          'c',
          'd',
          'f'
        ],
        [
          'c',
          'd',
          'g'
        ],
        [
          'c',
          'e',
          'f'
        ],
        [
          'c',
          'e',
          'g'
        ],
      ]);
  }
);

it(
  'sliceAndTranspose',
  () => {
    expect(sliceAndTranspose(
      configInitialState.columns,
      [
        'first',
        'second',
        'third',
        'fourth',
        'fifth',
        'sixth',
        'seventh',
        'eighth',
        'ninth',
      ],
      propEq(
        'name',
        'Skill'
      )
    ))
      .toEqual([
        [
          'first',
          'Baker'
        ],
        [
          'second',
          'Health Educator'
        ],
        [
          'third',
          'Budget Analyst'
        ],
        [
          'fourth',
          'Design Engineer'
        ],
        [
          'fifth',
          'Designer'
        ],
        [
          'sixth',
          'Backend Developer'
        ],
      ]);
  }
);
it(
  'cartesianCondition',
  () => {
    expect(cartesianCondition(
      [
        { name: 'x', collect: [
          'a',
          'b',
          'c'
        ] },
        { name: 'y', collect: [
          'd',
          'e'
        ] },
        { name: 'z', collect: [
          'f',
          'g'
        ] },
      ],
      null
    ))
      .toEqual([
        { x: 'a', y: 'd', z: 'f' },
        { x: 'a', y: 'd', z: 'g' },
        { x: 'a', y: 'e', z: 'f' },
        { x: 'a', y: 'e', z: 'g' },
        { x: 'b', y: 'd', z: 'f' },
        { x: 'b', y: 'd', z: 'g' },
        { x: 'b', y: 'e', z: 'f' },
        { x: 'b', y: 'e', z: 'g' },
        { x: 'c', y: 'd', z: 'f' },
        { x: 'c', y: 'd', z: 'g' },
        { x: 'c', y: 'e', z: 'f' },
        { x: 'c', y: 'e', z: 'g' },
      ]);
  }
);
it(
  'addParam',
  () => {
    expect(addParam(
      'name',
      add,
      [
        always(1),
        always(1)
      ]
    )({ pizza: 'formadgo' }))
      .toEqual({
        pizza: 'formadgo',
        name: 2
      });
  }
);
it(
  'dayOfWeekToDate',
  () => {
    expect(dayOfWeekToDate({
      limit: 12,
      startDate: '11.04.2021',
      days: [
        { label: 'Sunday', abbr: 'Sun', active: true },
        { label: 'Monday', abbr: 'Mon', active: false },
        { label: 'Tuesday', abbr: 'Tue', active: true },
        { label: 'Wednesday', abbr: 'Wed', active: false },
        { label: 'Thursday', abbr: 'Thu', active: true },
        { label: 'Friday', abbr: 'Fri', active: false },
        { label: 'Saturday', abbr: 'Sat', active: false }
      ],
    }))
      .toEqual({
        limit: 12,
        startDate: '11.04.2021',
        days: [
          0,
          2,
          4
        ],
        collect: [
          '11.04.2021',
          '13.04.2021',
          '15.04.2021',
          '18.04.2021',
          '20.04.2021',
          '22.04.2021',
          '25.04.2021',
          '27.04.2021',
          '29.04.2021',
          '02.05.2021',
          '04.05.2021',
          '06.05.2021'
        ],
      });
  }
);
it(
  'validate isEmpty',
  () => {
    expect(isCheck({
      rules: [
        [
          'isEmpty',
          'field is empty'
        ],
        [
          'isNumeric',
          'need typing numeric'
        ],
      ],
      value: 'наеае',
    }))
      .toEqual('need typing numeric');
  }
);
