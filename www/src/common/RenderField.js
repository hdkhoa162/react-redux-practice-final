import React from 'react';
import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';
// import 'rc-time-picker/assets/index.css';
// import '../assets/SigninStyles.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';


const minLength = (min) => (value) => value && value.length < min ? `Must be ${min} characters or more` : undefined;
const length = (len) => (value) => value && value.length !== len ? `Must be ${len} characters` : undefined;
const maxLength = (max) => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined;
// const maxYearLength = (max) => (value) => value && value.length > max ? `Year must be ${max - 6} characters` : undefined;

export const required = (value) => value ? undefined : 'Required';
// export const email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
// export const phone = (value) => value && !/^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/i.test(value) ? 'Invalid phone number' : undefined;
// export const validPassword = (value) => value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value) ? 'password must include at least 1 numeric and 1 alpha character.' : undefined;
export const number = (value) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minLength8 = minLength(8);
export const length6 = length(6);
export const maxLength160 = maxLength(160);
export const maxLength20 = maxLength(20);
// export const maxYearLength10 = maxYearLength(10);
export const maxLength50 = maxLength(50);
export const maxLength64 = maxLength(64);
export const maxLength512 = maxLength(512);
export const maxLength150 = maxLength(150);
export const maxLength400 = maxLength(400);
export const maxLength60 = maxLength(60);

export const renderField = ({ input, classNameStyle, type, style, ref, placeholder, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} className={"form-control " + classNameStyle} style={style} ref={ref} type={type} placeholder={placeholder} />
    <div>
      {touched && ((error && <span className="errorMessage">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const renderDatePicker = ({ input, type, style, ref, placeholder, selected, onSelect, dateFormat, meta: { touched, error, warning } }) => (
  <div>
    <DatePicker {...input} dateFormat={dateFormat} minDate={new Date()} selected={selected} value={input.value == '' ? '' : moment(input.value).format('YYYY/MM/DD')} onSelect={onSelect} className="form-control" style={style} ref={ref} type={type} placeholder={placeholder}/>
    <div>
      {touched && ((error && <span className="errorMessage">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const renderTimeSelect = ({ input, type, style, ref, placeholder, meta: { touched, error, warning } }) => (
  <div > 
    <TimePicker {...input} value={input.value === '' ? null : moment(input.value, 'hh:mm a')} showSecond={false} style={style} ref={ref} type={type} placeholder={placeholder} />
    <div>
      {touched && ((error && <span className="errorMessage">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export default renderField;
