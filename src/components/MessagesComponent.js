import React, { Component } from 'react'
import MessageComponent from './MessageComponent'

class MessagesComponent extends Component {
  render() {
    const { messages, toggleStar, toggleSelect } = this.props

    return (
      <div className="MessagesComponent">
      {messages.map(message => (
        <MessageComponent
          key={message.id}
          message={message}
          // selected={selectedMessageIds.indexOf(message.id) > -1}
          toggleStar={toggleStar}
          toggleSelect={toggleSelect}
        />
      ))}
      </div>
    )
  }
}

export default MessagesComponent
