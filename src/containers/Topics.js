import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../redux/actions/index';

class Topics extends Component {
  state = {
    topics: [],
    topic: ''
  };

  addTopic = e => {
    e.preventDefault();
    this.setState({
      topics: [...this.state.topics, this.state.topic],
      topic: '',
      next: false
    });
  };

  sendTopics = async e => {
    e.preventDefault();
    await fetch('http://localhost:3009/user', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        topics: this.state.topics,
        id: this.props.store.currentUser.id
      })
    })
      .then(res => res.json())
      .then(res => this.props.updateCurrentUser(res));
    this.setState({ next: true });
  };

  handleChange = e => {
    this.setState({ topic: e.target.value });
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addTopic(e);
    }
  };

  render() {
    if (this.state.next) {
      return <Redirect to="/main" />;
    }
    return (
      <div>
        <h1>Add Your Topics</h1>
        <form onSubmit={this.sendTopics} onKeyPress={this.onKeyPress}>
          <input
            type="text"
            name="topics"
            placeholder="Topic"
            value={this.state.topic}
            onChange={this.handleChange}
          />
        </form>
        <button type="button" onClick={this.addTopic}>
          Add
        </button>
        <button type="submit">Start Exploring</button>
        <div className="topicsList">
          {this.state.topics.map((el, i) => {
            return <p key={i}>{el}</p>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: data => dispatch(updateCurrentUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topics);
