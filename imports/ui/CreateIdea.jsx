import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar.jsx'
import {Redirect} from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
/* Jairo Bautista: En terminos generales el componente para crear una idea esta muy completo, 
pero se hubiera podido modularizar mas la parte de requerimientos */
class CreateIdea extends Component {

  constructor(props) {
    super(props);
    window.scrollTo(0,0);
    this.state = {
      value: [],
      count: 1,
      name: '',
      slogan: '',
      description: '',
      thumbnail: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i, event) {
    this.state.value[i] = event.target.value;
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({value});
  }

  renderRequirements() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      uiItems.push(
        <div className="center-div" style={{textAlign: 'center'}} key={i}>
          <div className="row" style={{display: 'inline', textAlign: 'center'}}>
            {/*<label htmlFor="exampleInputEmail1">Requerimiento {i + 1} &emsp; </label>*/}
            <select className="form-control" id="exampleSelect1" required style={{display: 'inline'}}
                    onChange={(e) => this.handleChange(i, e)} value={this.state.value[i] || ''}
                    placeholder={'Requerimiento ' + (i + 1) + ' ...'}>
              <option>Medicina</option>
              <option>Ingeniería</option>
              <option>Planeación</option>
              <option>Software</option>
              <option>Imagenes</option>
              <option>Biología</option>
              <option>Finanzas</option>
              <option>Ciencias</option>
              <option>Mecánica</option>
              <option>Química</option>
            </select>
            <input type='button' value='Remover' className="removeReqButton"
                   onClick={this.removeClick.bind(this, i)}/>
          </div>
        </div>
      )
    }
    return uiItems || null;
  }

  handleSubmit(event) {
    event.preventDefault();
    let b = this;
    Meteor.call('ideas.insert', this.state, function (error, result) {
      if (error) {
        Bert.alert( 'Debes iniciar sesión para poder publicar!', 'danger', 'growl-top-right' );
      }
      else{
        b.setState({redirect: true});
      }
    });
  }

  addClick() {
    this.setState({count: this.state.count + 1})
  }

  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      value
    })
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/ideas"/>;
    }
    return (
      <div>
        <NavBar/>
        <div id="thingId">
          <AccountsUIWrapper />
        </div>
        <div className="container2">
          <form id="contact" className="form" onSubmit={this.handleSubmit}>
            <h3>Publica una oportunidad</h3>
            {/*<h4>Contact us for custom quote</h4>*/}
            <fieldset>
              <input type="text" className="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp" required
                     value={this.state.name}
                     onChange={(event) => this.setState({name: event.target.value})}
                     placeholder="Nombre..."/>
            </fieldset>
            <fieldset>
              <input type="text" className="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp" required
                     value={this.state.slogan}
                     onChange={(event) => this.setState({slogan: event.target.value})}
                     placeholder="Slogan..."/>
            </fieldset>
            <fieldset>
              <input type="text" className="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp" required
                     value={this.state.description}
                     onChange={(event) => this.setState({description: event.target.value})}
                     placeholder="Descripción..."/>
            </fieldset>
            <fieldset>
              <input type="text" className="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp" required
                     value={this.state.thumbnail}
                     onChange={(event) => this.setState({thumbnail: event.target.value})}
                     placeholder="Url thumbnail..."/>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="exampleInputEmail1">Tags de la oportunidad</label><br/>
                {this.renderRequirements()}
                <div style={{textAlign: 'center'}}>
                  <input type='button' value='Agregar más' id="addMoreButton"
                         onClick={this.addClick.bind(this)}/>
                </div>
              </div>
            </fieldset>
            <fieldset>

            </fieldset>
            <fieldset>
              <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateIdea;