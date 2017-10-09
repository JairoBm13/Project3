import React, {Component, PropTypes} from 'react';
import {Ideas} from '../api/ideas.jsx';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
/* Jairo Bautista: En terminos generales el componente para crear una idea esta muy completo, 
pero se hubiera podido modularizar mas la parte de requerimientos */
export default class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      count: 1,
    };
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('ideas.setChecked', this.props.idea._id, !this.props.idea.checked);
  }

  togglePrivate() {
    Meteor.call('ideas.setPrivate', this.props.idea._id, !this.props.idea.private);
  }

  deleteThisIdea() {
    Meteor.call('ideas.remove', this.props.idea._id);
  }

  renderTags() {
    let uiItems = [];
    for (let i = 0; i < this.props.idea.count; i++) {
      uiItems.push(
        <div key={i} className="tags">
          <a className="tag">
            <span style={{verticalAlign: 'middle'}} >
              {this.props.idea.value[i] || ''}
            </span>
          </a>
        </div>
      )
    }
    return uiItems || null;
  }

  render() {

    const ideaClassName = classnames({
      checked: this.props.idea.checked,
      private: this.props.idea.private,
    });

    return (
      <div className="col-md-3 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h2 className="card-title">{this.props.idea.name}</h2>
            <img className="card-img-top" src={this.props.idea.thumbnail} width="200px"
                 alt="Imagen descriptiva proyecto"/>
            <p className="card-text">{this.props.idea.slogan}</p>
          </div>
          <div className="tags">
            {this.renderTags()}
          </div>
          <div className="card-footer">
            <Link to={{pathname: '/projects/create', query: this.props.idea}} onChange={(e) => this.deleteThisIdea()} href="#"
                  className="btn btn-primary moreInfoButton">Adoptar</Link>
          </div>
        </div>
      </div>
      // <li className={ideaClassName}>
      //   <button className="delete" onClick={this.deleteThisidea.bind(this)}>
      //     &times;
      //   </button>
      //
      //   <input
      //     type="checkbox"
      //     readOnly
      //     checked={this.props.idea.checked}
      //     onClick={this.toggleChecked.bind(this)}
      //   />
      //
      //   { this.props.showPrivateButton ? (
      //     <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
      //       { this.props.idea.private ? 'Private' : 'Public' }
      //     </button>
      //   ) : ''}
      //
      //   <span className="text">{this.props.idea.text}</span>
      //   <span className="text">
      //     <strong>{this.props.idea.username}</strong>: {this.props.idea.text}
      //   </span>
      // </li>
    );
  }
}
/* Jairo Bautista: Los proptypes son muy utiles :( */

Idea.propTypes = {
  // This component gets the idea to display through a React prop.
  // We can use propTypes to indicate it is required
  // idea: PropTypes.object.isRequired,
};