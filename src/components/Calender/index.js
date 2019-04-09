import React, {Component} from 'react'
import {isLeapYear} from '../../utils/date'
import css from './index.scss'

const MODES = ['weekly', 'monthly', 'yearly']
const DAYS = {
  1: 31,2: 28,3: 31,4: 30,5: 31,6: 30,7: 31,8: 31,9: 30,10: 31,11: 30,12: 31
}
const time = new Date()
class Calender extends Component {
  state = {
    displayMode: 'monthly',
    dates: [],
    date: {
      y: time.getFullYear(),
      m: time.getMonth(),
      d: time.getDate(), // day
      weekAtDay1: new Date(time.getFullYear(), time.getMonth(), 1).getDay() - 1
    }
  }
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const {y,m,d,weekAtDay1} = this.state.date
    if (m === 2 && isLeapYear(y)) DAYS[m] = 29

    this.setState({
      dates: new Array(7 * (Math.ceil(DAYS[m] / 7)))
      .fill(null)
      .map((item, index) => ((index > weekAtDay1 && (index - weekAtDay1) < DAYS[m]) ? index - weekAtDay1 : null))
      .reduce((counter, currentVal, index) => {
        const week = Math.floor(index / 7)
        if (!counter[week]) {
          counter[week] = []
        }
      
        counter[week].push(currentVal)
        return counter
      }, []),
    })
  }
  setNewMonth = (flag) => {
    this.setState({
      dates: new Array(7 * (Math.ceil(DAYS[m] / 7)))
      .fill(null)
      .map((item, index) => ((index > weekAtDay1 && (index - weekAtDay1) < DAYS[m]) ? index - weekAtDay1 : null))
      .reduce((counter, currentVal, index) => {
        const week = Math.floor(index / 7)
        if (!counter[week]) {
          counter[week] = []
        }
      
        counter[week].push(currentVal)
        return counter
      }, []),
    })
  }
  render() {
    const {dates, date} = this.state
    const currentDay = date.d
    return (
      <div>
        <div className={css.control}>
          <button onClick={() => this.setNewMonth(-1)}>Prev Month</button>
          <button onClick={() => this.setNewMonth(1)}>Next Month</button>
        </div>
        <table>
          {/* <thead>
            <tr>
              {
                new Array(7).fill(null).map((item, index) => (
                  <th>{index}</th>
                ))
              }
            </tr>
          </thead> */}
          <tbody>
            {
              dates.map((week, index) => (
                <tr key={index}>
                  {
                    week.map((day, index) => (
                      <td key={index} className={`${css.day} ${day === currentDay && css.currentDay}`}>
                        {day}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
  switchMode(key) {
    if (MODES[key]) {
      this.setState({
        displayMode: MODES[key]
      })
    }
  }
}

export default Calender