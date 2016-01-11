// https://egghead.io/lessons/rxjs-reactive-programming-what-is-rxjs?series=introduction-to-reactive-programming

import React from 'react'
import { Observable } from 'rx'

const markupItem= (item, idx) => <div key={idx}>{item}</div>
export default class Video01 extends React.Component {
  render() {
    return (
      <div>
        <h2>Video 1</h2>
        <div>{this.state.items.map(markupItem)}</div>
        <div>{this.state.sum}</div>
      </div>
    )
  }

  componentDidMount() {
    const push= (item, key) => {
      let items= this.state[key]
      items.push(item)
      let state= {}
      state[key]= items
      this.setState(state)
    }

    let source=
      Observable
      .interval(400)
      .take(9)
      .map(i => ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'][i])

    this.listener1= source.subscribe(item => push(item, 'items'))

    let result= source
      .map(x => parseInt(x))
      .filter(x => !isNaN(x))
      .reduce((x,y) => x + y)

    this.listener2= result.subscribe(sum => this.setState({sum}))
  }

  componentWillUnmount() {
    this.listener1.dispose()
    this.listener2.dispose()
  }

  state= {
    items: [],
  }
}
