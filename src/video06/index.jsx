// https://egghead.io/lessons/rxjs-reactive-programming-new-requests-from-refresh-clicks

import React from 'react'
import { Observable } from 'rx'
import { DOM } from 'rx-dom'

const Suggestion= ({href, text, img}) =>
  <li style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
    <img src={img} width={36} height={36} style={{marginRight: 10}}/>
    <a href={href} target='_blank' style={{marginRight: 10}}>{text}</a>
    <a href='#'>x</a>
  </li>

export default class Video06 extends React.Component {
  render() {
    const suggestions= this.state.suggestions.map(
      (user, idx) =>
        <Suggestion
          key={idx}
          href={user.html_url}
          text={user.login}
          img={user.avatar_url}
          />
    )

    return (
      <div>
        <h2>Video 6</h2>
        <h3>Who to follow <a href='#' ref={e => this.refreshButton= e}>Refresh</a></h3>
        <ul>
          {suggestions}
        </ul>
      </div>
    )
  }

  componentDidMount() {
    const url= 'https://api.github.com/users'

    let refreshClickStream= Rx.Observable.fromEvent(this.refreshButton, 'click')

    let startupRequestStream= Rx.Observable.just(url)

    let requestOnRefreshStream= refreshClickStream
      .map(e => {
        e.preventDefault()
        this.setState({suggestions: []})
        return `${url}?since=${Math.floor(Math.random()*500)}`
      })

    // ------a---b------c------->
    // s------------------------>
    //           merge
    // s-----a---b------c------->

    let responseStream= requestOnRefreshStream
      .merge(startupRequestStream)
      .flatMap(url => DOM.getJSON(url))

    const createSuggestionStream= responseStream => responseStream.map(list => list[Math.floor(Math.random() * list.length)])
    let suggestionStreams= [1,2,3].map(() => createSuggestionStream(responseStream))

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
}
