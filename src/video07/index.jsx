// https://egghead.io/lessons/rxjs-reactive-programming-clear-data-while-loading-with-rxjs-startwith

import React from 'react'
import { Observable } from 'rx'
import { DOM } from 'rx-dom'

const Suggestion= ({href, text, img}) =>
  <li style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
    <img src={img} width={36} height={36} style={{marginRight: 10}}/>
    <a href={href} target='_blank' style={{marginRight: 10}}>{text}</a>
    <a href='#'>x</a>
  </li>

export default class Video07 extends React.Component {
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
        <h2>Video 7</h2>
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

    let startupReqeustStream= Rx.Observable.just(url)

    let requestOnRefreshStream= refreshClickStream
      .map(e => {
        e.preventDefault()
        this.setState({suggestions: []})
        return `${url}?since=${Math.floor(Math.random()*500)}`
      })

    let responseStream= requestOnRefreshStream
      .merge(startupReqeustStream)
      .flatMap(url => DOM.getJSON(url))

    // --------u-------------u-->
    //       startWith(N)
    // N-------u---------------->
    // ------------r----r------->
    //       map
    // ------------N----N------->
    //       merge
    // N-------u---N----N----u-->

    const createSuggestionStream=
      responseStream => responseStream.map(
        list => list[Math.floor(Math.random() * list.length)]
      )
      //.startWith(null) -> render null value on initial load, not needed because of React
      //.merge(refreshClickStream.map(e => null)) -> render null value after every refresh click, not needed because of React

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
