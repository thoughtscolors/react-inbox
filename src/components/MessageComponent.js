import React, { Component } from 'react'
// import classNames from 'classnames'

class MessageComponent extends Component {
  render() {
    const {message, toggleStar, toggleSelect} = this.props

    const readClass = message.read ? 'read' : 'unread'
    const starClass = message.starred ? 'fa-star' : 'fa-star-o'
    const starMessage = e => {
      e.stopPropagation()
      toggleStar(message)
    }

    const selectedClass = message.selected ? 'selected' : ''
    const selectMessage = e => {
      e.stopPropagation()
      toggleSelect(message)
    }

    const labels = message.labels.map(label => <span className="label label-warning">{label}</span>)

    // let readClass = classNames({
    //   row: true,
    //   message: true,
    //   read: message.read,
    //   unread: !message.read,
    //   selected: selected
    // })
    //
    // let starredClass =  classNames({
    //   star: true,
    //   fa: true,
    //   'fa-star': message.starred,
    //   'fa-star-o': !message.starred,
    // })
    //
    // let labelClass = classNames({
    //   label: true,
    //   'label-warning': true,
    // })
    //
    // let checkedClass = classNames({
    //   checked: selected,
    //   '': !selected
    // })

    return (
      <div className={`row message ${readClass} ${selectedClass}`} id={message.id}>
  <div className="col-xs-1">
    <div className="row">
      <div className="col-xs-2">
        <input type="checkbox" checked={message.selected} readOnly={true} onClick={selectMessage} />
      </div>
      <div className="col-xs-2">
        <i className={`star fa ${starClass}`} onClick={starMessage} ></i>
      </div>
    </div>
  </div>
  <div className="col-xs-11">
    {labels}
    <a href=".">{message.subject}</a>
  </div>
</div>
    )
  }
}



export default MessageComponent
