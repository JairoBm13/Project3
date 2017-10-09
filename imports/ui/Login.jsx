import React, {Component, PropTypes} from 'react';
//Donde usan esto ?
export default class Login {
  render(){
    return(
      <div>
        <template name="register">
          <form>
            <input type="email" name="registerEmail"/>
              <input type="password" name="registerPassword"/>
                <input type="submit" value="Register"/>
          </form>
        </template>
      </div>
    );
  }
}