import React, {Component, PropTypes} from 'react';
import Task from '../SmallElements/Task.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import {Tasks} from '/imports/api/tasks.jsx';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import NavBar from '../SmallElements/NavBar.jsx'
import Captcha from "../SmallElements/Captcha";

/* Jairo Bautista: En terminos generales el componente para crear una idea esta muy completo */

// ProjectsView component - represents the whole app
class ProjectsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Captcha/>
        <div className="row my-4">
          <div className="col-lg-8">
            <img className="img-fluid rounded" src="http://www.goaugment.io/wp-content/uploads/2016/07/Innovation-is-an-Attitude.jpg" alt=""/>
          </div>
          <div className="col-lg-4">
            <br/>
            <h1>Proyectos activos</h1>
            <i id="sl">Haz parte de la cultura innovadora Uniandina</i>
            <p>Te presentamos los proyectos de innovación en desarrollo en la Universidad de los Andes.
              ¡Puedes aportar en el desarrollo de estos proyectos comentando ideas, aportando recursos o te
              puedes unir al equipo de trabajo!</p>
          </div>
        </div>

        <div className="card text-white bg-secondary my-4 text-center">
          <div className="card-body" id="midbar">
            <span className="text-white m-0">¡Participa en la construcción de proyectos innovadores! </span>
          </div>
        </div>

        <div className="row">
          {this.renderTasks()}
        </div>
      </div>

    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
}, ProjectsView);