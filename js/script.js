'use strict';

import tabs from './modules/tabs';
import modal from './modules/modals';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
	tabs();
	modal();
	timer();
	cards();
	forms();
	calc();
	slider();
});
