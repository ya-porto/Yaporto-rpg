/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
const validationPassword: Function = (val: string): boolean => /^([a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\{\}\[\]\-\+_\=]+)$/.test(val);
const validationPhone: Function = (val: string): boolean => /^[0-9]{11,13}$/.test(val);
const validationEmpty: Function = (val: string): boolean => val !== '';
const validationEmail: Function = (val: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((val));
const validationNumber: Function = (val: string): boolean => /^\d*$/.test(val);

export {
	validationPassword,
	validationPhone,
	validationEmpty,
	validationEmail,
	validationNumber
};
