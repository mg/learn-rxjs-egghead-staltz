// https://egghead.io/lessons/rxjs-reactive-programming-what-is-rxjs?series=introduction-to-reactive-programming

import React from 'react'
import { Observable, Scheduler } from 'rx'

export default class Video02 extends React.Component {
  render() {
    return (
      <div>
        <h2>Video 2</h2>
        <div style={{display: 'flex'}}>
          <button ref={e => this.button= e}>BUTTON</button>
          <h4 ref={e => this.label= e}>&nbsp;</h4>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let clickStream= Observable.fromEvent(this.button, 'click')

    let doubleClickStream= clickStream
      .buffer(() => clickStream.debounce(200))
      .map(arr => arr.length)
      .filter(len => len === 2)

    this.sub1= doubleClickStream.subscribe(e => this.label.textContent= 'double click')
    this.sub2= doubleClickStream
      .debounce(1000)
      .subscribe(() => this.label.textContent= '-')
  }

  componentWillUnmount() {
    this.sub1.dispose()
    this.sub2.dispose()
  }

  state= {
  }
}
