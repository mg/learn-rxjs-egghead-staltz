// https://egghead.io/lessons/rxjs-04-reactive-programming-async-requests-and-responses-in-rxjs

import React from 'react'
import { Observable } from 'rx'
import { DOM } from 'rx-dom'

export default class Video04 extends React.Component {
  render() {
    return (
      <div>
        <h2>Video 4</h2>
        <div ref={e => this.output= e}/>
      </div>
    )
  }

  componentDidMount() {
    // map Observable to Observable: a stream of observables
    // flatmap Observable to Observable: a stream of values from mapped Observable

    let requestStream= Rx.Observable.just('https://api.github.com/users')
    let responseStream= requestStream.flatMap(url => DOM.getJSON(url))
    this.requestSubscription= responseStream.subscribe(data => this.output.textContent= JSON.stringify(data))
  }

  componentWillUnmount() {
    this.requestSubscription.dispose()
  }

  state= {
    values: []
  }
}
