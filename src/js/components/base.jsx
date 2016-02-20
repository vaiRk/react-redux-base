'use strict';

import React, { PropTypes, Component } from 'react';
import bindAll from 'lodash/bindAll';

export default class BaseComponent extends Component {
	constructor(props, context) {
		super(props, context);
		bindAll(this);
	}
}