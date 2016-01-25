// https://egghead.io/lessons/rxjs-reactive-programming-using-cached-network-data-with-rxjs

import React from 'react'
import { Observable, Subject } from 'rx'
import { DOM } from 'rx-dom'

class Suggestion extends React.Component {
  render() {
    const { href, text, img, onClick }= this.props
    return (
      <li style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
        <img src={img} width={36} height={36} style={{marginRight: 10}}/>
        <a href={href} target='_blank' style={{marginRight: 10}}>{text}</a>
        <a href='#' onClick={onClick}>x</a>
      </li>
    )
  }
}

export default class Video09 extends React.Component {
  render() {
    this.closeButtons= []
    const suggestions= this.state.suggestions.map(
      (user, idx) =>
        <Suggestion
          key={idx}
          href={user.html_url}
          text={user.login}
          img={user.avatar_url}
          onClick={e => this.onClick(e, idx)}
          />
    )

    return (
      <div>
        <h2>Video 9</h2>
        <h3>Who to follow <a href='#' ref={e => this.refreshButton= e}>Refresh</a></h3>
        <ul>
          {suggestions}
        </ul>
      </div>
    )
  }

  onClick(e, n) {
    e.preventDefault()
    let arr= this.state.suggestions
    arr=  [
      ...arr.slice(0, n),
      ...arr.slice(n+1, arr.length),
    ]
    this.setState({
      suggestions: arr
    })

    // to force a re-render BEFORE event stream executes
    setTimeout(() => this.closeClickStreams[n].onNext(), 1)
  }

  componentDidMount() {
    const url= 'https://api.github.com/users'

    this.closeClickStreams= [
      new Subject(),
      new Subject(),
      new Subject(),
    ]

    let refreshClickStream= Rx.Observable.fromEvent(this.refreshButton, 'click')

    let startupRequestStream= Rx.Observable.just(url)

    let requestOnRefreshStream= refreshClickStream
      .map(e => {
        e.preventDefault()
        this.setState({suggestions: []})
        return `${url}?since=${Math.floor(Math.random()*500)}`
      })

    let responseStream= requestOnRefreshStream
      .merge(startupRequestStream)
      .flatMap(url => DOM.getJSON(url))
      .shareReplay(1) // every subscriptions will get same stream

    const getRandomUser= list => list[Math.floor(Math.random() * list.length)]

    const createSuggestionStream= (responseStream, closeClickStream) =>
      responseStream
        .map(getRandomUser)
        .merge(closeClickStream.withLatestFrom(responseStream, (x, R) => getRandomUser(R)))

    let suggestionStreams= [0,1,2].map(i => createSuggestionStream(responseStream, this.closeClickStreams[i]))

    this.suggestionSubscriptions= suggestionStreams.map(
      stream => stream.subscribe(
        user => {
          let suggestions= this.state.suggestions
          suggestions.push(user)
          this.setState(suggestions)
        }
      )
    )
  }

  componentWillUnmount() {
    this.suggestionSubscriptions.forEach(subscription => subscription.dispose())
  }

  state= {
    suggestions: []
  }
  closeButtons: []
}
