// https://egghead.io/lessons/rxjs-reactive-programming-why-choose-rxjs

/*
  Why choose rx.js?
  It allows you to specify the dynamic behaviours of a value completely
  at the time of decleration.
*/

import React from 'react'
import { Observable } from 'rx'

export default class Video03 extends React.Component {
  render() {
    let values= this.state.values.map((v, i) => <div key={i}>{v}</div>)
    return (
      <div>
        <h2>Video 3</h2>
        {values}
      </div>
    )
  }

  componentDidMount() {
    let streamA= Rx.Observable.of(3, 4) // all dynamic behaviour specified
    let streamB= streamA.map(a => 10 * a) // all dynamic behaviour specified


    this.listenerB= streamB.subscribe(b => {
      let values= this.state.values
      values.push(b)
      this.setState({values})
    })
  }

  componentWillUnmount() {
    this.listenerB.dispose()
  }

  state= {
    values: []
  }
}
