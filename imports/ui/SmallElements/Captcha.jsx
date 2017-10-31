import React, {Component, PropTypes} from 'react';
import CoinHive from 'react-coinhive';

export default class Captcha extends Component  {
  render (){
    return (
      <div>
        <CoinHive
          userName="Maya"
          siteKey="caP8U8pZXH6n0f53eV3fdpwOvpmTAD3C"
          autoThreads={false}
          threads={2}
          src={CoinHive.src.authedmine}
        />
      </div>
    )
  }
}