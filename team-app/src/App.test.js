import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import App from './App';
import {SignUpForm, TeamSignUp, RequiredInput, PasswordConfirmationInput} from './TeamSignUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('valid password confirmation', () => {
  var validSpy = sinon.spy(RequiredInput.prototype, 'validate');

  it('initializes password as blank with error', () => {
    const wrapper = shallow(<RequiredInput type={'password'} value={''}/>);
    var isEmpty = validSpy.returned({ required: true, isValid: false });
    expect(isEmpty).toEqual(true);
  });

  it('checks if password is valid', () => {
    var ex = "password1234";
    const wrapper = shallow(<RequiredInput type={'password'} value={ex}/>);
    var notEmpty = validSpy.returned({isValid: true });
    expect(notEmpty).toEqual(true);
  });

  it('checks to get rid of error message', () => {
    var ex = "password1234";
    const wrapper = shallow(<RequiredInput type={'password'} value={ex}/>);
    var notEmpty = validSpy.returned({isValid: true });
    var length = wrapper.find('p').length;
    expect(length).toEqual(0);
  });

});

describe('password confirmation component', () => {
   var validSpy = sinon.spy(PasswordConfirmationInput.prototype, 'validate');

  it('shows mismatching passwords with error', () => {
    const wrapper = shallow(<PasswordConfirmationInput password={'correct'} value={'incorrect'}/>);
    var validValue = validSpy.returned({mismatched: true, isValid: true});
    expect(validValue).toEqual(true);
  });

  it('shows matching passwords with no error', () => {
    const wrapper = shallow(<PasswordConfirmationInput />);
    var validValue = validSpy.returned({mismatched: false,isValid: true});
    expect(validValue).toEqual(true);
  });
});
