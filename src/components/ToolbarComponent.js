import React, {Component} from 'react'

class ToolbarComponent extends Component {

  render() {
    const {messages, toggleSelectAll, toggleReadStatus, showCompose, deleteMessage, addLabel, removeLabel } = this.props

    let unreadCount = messages.filter(message => message.read === false).length;
    const selectedCount = messages.filter(message => message.selected).length
    let selectAllClass

    switch (selectedCount) {
      case 0:
        selectAllClass = 'fa-square-o'
        break;
      case messages.length:
        selectAllClass = 'fa-check-square-o'
        break;
      default:
        selectAllClass = 'fa-minus-square-o'

    }

    return (<div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadCount}</span>
          unread messages
        </p>

        <a className="btn btn-danger" onClick={showCompose}>
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default" onClick={toggleSelectAll}>
          <i className={`fa ${selectAllClass}`}></i>
        </button>

        <button className="btn btn-default" disabled={selectedCount === 0} onClick={() => toggleReadStatus(true)}>
          Mark As Read
        </button>

        <button className="btn btn-default" disabled={selectedCount === 0} onClick={() => toggleReadStatus(false)}>
          Mark As Unread
        </button>

        <select className="form-control label-select add-label" disabled={selectedCount === 0} onChange={addLabel}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select remove-label" disabled={selectedCount === 0} onChange={removeLabel}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={selectedCount === 0} onClick={deleteMessage}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>)
  }
}

export default ToolbarComponent
