import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
    $('html').attr('lang', 'es');
    render(<App />, document.getElementById('render-target'));
});