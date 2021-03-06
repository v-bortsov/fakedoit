import dayjs from 'dayjs';
import { always, aperture, append, assoc, chain, clone, concat, converge, curry, divide, filter, flatten, ifElse, is, last, length, map, of, omit, pair, pipe, prop, reduce, repeat, when, __ } from 'ramda';
import { Interval, DaysOfWeek } from '../types/enums';
import { addParam, enumToObject } from './popular';
// const opt = { days: [1, 2, 3], lengthDays: 7, limit: 10, mode: 'week|range', startDate: '', endDate: '' }
const interval = 7;

const countDays = pipe<any, number[], number>(
  prop(Interval.days),
  length
);

const ceilLimit = pipe(
  converge(
    divide,
    [
      prop('limit'),
      countDays
    ]
  ),
  Math.ceil
);

const dayAtNumber = enumToObject(DaysOfWeek);

export const filterAndPropDayNumber = pipe<any, any, any>(
  filter<any>(prop('active')),
  map<any, any[]>(pipe<any, any, any>(
    prop('abbr'),
    prop(
      __,
      dayAtNumber
    )
  ))
);

export const addDaysToDate = curry((
  currentDate: string,
  count: number,
  flag: Interval
) => dayjs(
  currentDate,
  'DD.MM.YYYY'
)
  .add(
    count,
    flag
  ));

export const dayToDate = pipe<string[], any, any, any>(
  pair,
  converge(
    concat,
    [
      pipe(
        prop<any>(0),
        when(
          is(String),
          of
        )
      ),
      pipe(
        converge(
          addDaysToDate(
            __,
            __,
            Interval.days
          ),
          [
            pipe(
              prop<any>(0),
              ifElse(
                is(String),
                clone,
                last
              )
            ),
            prop<any>(1),
          ]
        ),
        of
      ),
    ]
  )
);

export const transformDates = pipe<any, any, any, any, any>(
  chain(
    assoc('collect'),
    pipe<any, any, any, any, number[]>(
      converge(
        repeat,
        [
          prop('daysTransform'),
          ceilLimit
        ]
      ),
      flatten,
      aperture(2),
      reduce(
        (
          acc: number[], curr: number[]
        ): number[] => append(
          curr[1] < curr[0] ? ((interval - curr[0]) + curr[1]) : (curr[1] - curr[0]),
          acc
        ),
        []
      )
    )
  ),
  chain(
    assoc('dates'),
    converge(
      reduce,
      [
        always(dayToDate),
        pipe(
          prop('startDay'),
          (e: Date)=>dayjs(
            e,
            'DD.MM.YYYY'
          )
          // (e: Date)=>moment(e)
          //   .format('DD.MM.YYYY')
        ),
        prop('collect'),
      ]
    )
  ),
  prop('dates')
);// (opt)

export const dayOfWeekToDate = pipe<any, any, any, any>(
  addParam(
    'daysTransform',
    filterAndPropDayNumber,
    [prop(Interval.days)]
  ),
  addParam(
    'collect',
    transformDates,
    [clone]
  ),
  omit(['daysTransform'])
);

export const calcDates = curry((
  startDay: dayjs.Dayjs, limit: number, cycle: number[]
): string[] => {
  let numberDay = 0
  const dates = []

  while(limit > 0){
    startDay = dayjs(startDay)
      .add(
        cycle[numberDay],
        'day'
      )
      
    dates.push(startDay.format('DD.MM.YYYY'))
    
    if(numberDay === (cycle.length-1))
      numberDay = 0
    else
      numberDay++

    limit--
  }

  return dates
})

export const weekToDays = (week: boolean[]): number[] => {
  let arrVal = [];
  let j = 0;

  for (let i = week.length - 1; i >= 0; i--) {
    j++;
    if (week[i]) {
      arrVal.unshift(j);
      j = 0;
    }
  }

  return arrVal;
}