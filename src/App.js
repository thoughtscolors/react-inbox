import React, { Component } from 'react';
import ToolbarComponent from './components/ToolbarComponent'
import MessagesComponent from './components/MessagesComponent'
import Compose from './components/Compose'


class App extends Component {

  state = {
    messages: [],
    showComposeForm: false,
    showMessages: true,
  }

  componentDidMount = async () => {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({messages: json})
  }



toggleProperty(message, property) {
  const index = this.state.messages.indexOf(message)
  this.setState({
    messages: [
      ...this.state.messages.slice(0, index),
      {...message, [property]: !message[property]},
      ...this.state.messages.slice(index + 1)
    ]
  })
}

toggleStar = message => {
  this.toggleProperty(message, 'starred')
}

toggleSelect = message => {
  this.toggleProperty(message, 'selected')
}

toggleReadStatus = (readStatus) => {
  this.setState({
    messages: this.state.messages.map(
      message => (message.selected ? {...message, read: readStatus} : message)
    )
  })
}

showCompose = () => {
  console.log('clicked show compose');
  this.setState({
    showComposeForm: !this.state.showComposeForm,
    showMessages: !this.state.showMessages,
   })
}

sendMessage = async () => {
  const subject = document.querySelector('#subject').value
  const body = document.querySelector('#body').value
  const response =
  await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        body,
      })
    })
    console.log(response);
    this.showCompose()
}

deleteMessage = async () => {
  const selected = this.state.messages.filter(message => message.selected)
  const messageIds = selected.map(message => message.id)
  console.log(selected);
  console.log(messageIds);
  const fff = this.state.messages.filter(message => message.selected).map(message => message.id)

    console.log('fff', fff);
  await fetch('http://localhost:8082/api/messages',
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({

      messageIds,
      "command": "delete"
    })
  })
  .then(response => this.updateMessages())
}

updateMessages = async () => {
  const response = await fetch('http://localhost:8082/api/messages')
  const json = await response.json()
  this.setState({messages: json})
}


toggleSelectAll = () => {
  const selectedMessages = this.state.messages.filter(
    message => message.selected
  )
  const selected = selectedMessages.length !== this.state.messages.length

  this.setState({
    messages: this.state.messages.map(message => message.selected !== selected ? {...message, selected} : message)
  })
}

  render() {
    return (
    <div>
      <div className="navbar navbar-default" role="navigation">
         <div className="container">
           <div className="navbar-header">
             <button
               type="button"
               className="navbar-toggle collapsed"
               data-toggle="collapse"
               data-target=".navbar-collapse">
               <span className="sr-only">Toggle navigation</span>
               <span className="icon-bar" />
               <span className="icon-bar" />
               <span className="icon-bar" />
             </button>
             <a className="navbar-brand" href="/">
               React Inbox
             </a>
           </div>
         </div>
       </div>
      <div className="App">
        <ToolbarComponent
          messages={this.state.messages}
          toggleSelectAll={this.toggleSelectAll}
          toggleReadStatus={this.toggleReadStatus}
          showCompose={this.showCompose}
          deleteMessage={this.deleteMessage}
         />
         {this.state.showComposeForm ? <Compose sendMessage={this.sendMessage}/> : null}
         {this.state.showMessages ?
           <MessagesComponent
           messages={this.state.messages}
           toggleStar={this.toggleStar}
           toggleSelect={this.toggleSelect}/>
           : null}

      </div>
    </div>
    );
  }
}

export default App;
