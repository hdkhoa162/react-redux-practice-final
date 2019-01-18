import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { updateTodoList } from '../../actions/TodoListAction';

class TodoItems extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      listItem: '',
      itemsUpdatedStatus: '',
      monitoredUpdatedItems: [],
      selectedDate: new Date()
    };
  }

  componentWillMount = () => {
    this.setState({
      listItem: this.props.listItem
    })
  }

  updateItems = (e) => {
    const token = JSON.parse(localStorage.getItem('__user')).token;
    const itemList = {};

    itemList.removed = [];
    itemList.statusComplete = [];
    itemList.statusIncomplete = [];

    this.state.listItem.map((item, key) => {
      if (item.Status === 'removed' && this.state.monitoredUpdatedItems.includes(key.toString())) {
        itemList.removed.push(item);
      } else if (item.Status === 'complete' && this.state.monitoredUpdatedItems.includes(key.toString())) {
        itemList.statusComplete.push(item);
      } else if (this.state.monitoredUpdatedItems.includes(key.toString())) {
        itemList.statusIncomplete.push(item);
      }
    });

    if (_.isEmpty(itemList.removed) && _.isEmpty(itemList.statusComplete) && _.isEmpty(itemList.statusIncomplete)) {
      this.setState({
        itemsUpdatedStatus: 'nothing'
      });
    } else {
      this.getUpdatedResult(itemList, token);
    }

  }

  getUpdatedResult = async (itemList, token) => {
    await this.props.updateTodoList(itemList, token);

    if (this.props.updatedTodoList._rs === 200) {
      this.setState({
        itemsUpdatedStatus: 'success',
        monitoredUpdatedItems: [],
      });
    } else {
      this.setState({
        itemsUpdatedStatus: 'fail',
        monitoredUpdatedItems: [],
      });
    }

  }

  componentWillReceiveProps = (props) => {
    if (this.props.listItem.length !== props.length) {
      this.setState({
        listItem: props.listItem
      });
    }
  }

  removeItem = (e) => {
    const itemIdArr = this.state.monitoredUpdatedItems;

    this.state.listItem[parseInt(e.target.id)].Status = 'removed';
    this.state.listItem[parseInt(e.target.id)].IsActive = false;

    if (!this.state.monitoredUpdatedItems.includes(e.target.id)) {
      itemIdArr.push(e.target.id);
      this.setState({
        monitoredUpdatedItems: itemIdArr,
        listItem: this.state.listItem
      });
    } else {
      const eleIdx = this.state.monitoredUpdatedItems.indexOf(e.target.id);
      itemIdArr[eleIdx] = '';
      this.setState({
        monitoredUpdatedItems: itemIdArr,
        listItem: this.state.listItem
      });
    }
    this.forceUpdate();
  }

  handleChange = (e) => {
    const itemIdArr = this.state.monitoredUpdatedItems;
    const listItemState = this.state.listItem;
    listItemState[e.target.id].Status = (e.target.checked) ? 'complete' : 'incomplete';

    if (!this.state.monitoredUpdatedItems.includes(e.target.id)) {
      itemIdArr.push(e.target.id);
      this.setState({
        monitoredUpdatedItems: itemIdArr
      });
    } else {
      const eleIdx = this.state.monitoredUpdatedItems.indexOf(e.target.id);
      itemIdArr[eleIdx] = '';
      this.setState({
        monitoredUpdatedItems: itemIdArr
      });
    }

    this.setState({ listItem: listItemState });
    this.forceUpdate();
  }

  loadItems = (itemList) => {
    if (Array.isArray(itemList)) {
      if (itemList.length > 0) {
        return itemList.map((value, key) => {
          let checkList = '';
          let priorityStyle = '';

          if (value.Status !== 'removed') {
            if (value.Status === 'complete') {
              checkList = (<label className='todoItem__checkList'><div>
                <input className='todoItem__checkList__checkbox' type='checkbox' name={key} id={key} onChange={this.handleChange} value={value.Status === 'complete'} checked={value.Status === 'complete'} />
                <span className='todoItem__checkList__checkmark'></span>
              </div></label>);
            }
            else {
              checkList = (<label className='todoItem__checkList'><div>
                <input className='todoItem__checkList__checkbox' type='checkbox' name={key} id={key} onChange={this.handleChange} value={value.Status === 'complete'} checked={value.Status === 'complete'} />
                <span className='todoItem__checkList__checkmark'></span>
              </div></label>);
            }

            if (value.Priority === 'high') {
              priorityStyle = 'todoItem__row__high__priority';
            } else if (value.Priority === 'medium') {
              priorityStyle = 'todoItem__row__medium__priority';
            } else {
              priorityStyle = 'todoItem__row__low__priority';
            }

            return (
              <div key={value._id}>
                <div id={key} className='todoItem__row'>
                  <div className='todoItem__row__secondColumn'>
                    {checkList}
                  </div>
                  <div className='todoItem__row__firstColumn'>
                    <span>{value.Description}</span>
                  </div>
                  <div className='todoItem__row__startAt'>
                    <span>{value.StartAt}</span>
                  </div>
                  <div className={priorityStyle}>
                    <span>{value.Priority}</span>
                  </div>
                  <div className='todoItem__row__thirdColumn'>
                    <button onClick={this.removeItem.bind(this)} id={key} key={value._id} className='remove__btn' type='button' onClick={this.removeItem}>Remove</button>
                  </div>
                </div>
              </div>
            )
          }
        })
      } else {
        return (<span className='noData'>Hey ya, You are free today!!!</span>)
      }
    } else {
      return undefined;
    }
  }

  render() {
    const items = this.loadItems(this.state.listItem);
    const updateItemButton = (this.state.listItem.length > 0) ? (<button className='todoItem__update__btn' onClick={this.updateItems.bind(this)} key='updateItems' id='updateItems' type='button'>Update the tasks</button>) : '';
    let updateResult = '';
    let statusStyle = '';

    if (this.state.listItem.length > 0) {
      if (this.state.itemsUpdatedStatus === 'success') {
        updateResult = (<p>Items updated successfully</p>);
        this.state.itemsUpdatedStatus = '';
        statusStyle = 'todoItem__status__success';
      } else if (this.state.itemsUpdatedStatus === 'fail') {
        updateResult = (<p>Items updated failed</p>);
        this.state.itemsUpdatedStatus = '';
        statusStyle = 'todoItem__status__fail';
      } else {
        if (this.state.itemsUpdatedStatus !== '') {
          updateResult = (<p>You have nothing to update</p>);
          this.state.itemsUpdatedStatus = '';
          statusStyle = 'todoItem__no__update';
        }
      }
    }

    return (
      <div>
        <div className='todoItem'>
          {items}
          <div className='todoItem__btn'>
            {updateItemButton}
          </div>
          <div className={statusStyle}>{updateResult}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  updatedTodoList: state.toObject().updateTodoList.toObject().updatedTasks
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodoList: async (itemList, token) => {
      dispatch(await updateTodoList(itemList, token))
    }
  }
}

TodoItems.propTypes = {
  listItem: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItems);
