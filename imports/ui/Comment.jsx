import React, {Component, PropTypes} from 'react';

export default class Comment extends Component {

  render() {
    return(
      <div className="media mb-4">
        {/* Jairo Bautista: les falto agregar el alt, auque como es un placeholder no importa */}
        <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
        <div className="media-body">
          <h3 className="mt-0" style={{fontSize:'40px !important'}}>{this.props.comment.username+''}</h3>
          {this.props.comment.text}
        </div>
      </div>
    )
  }
}