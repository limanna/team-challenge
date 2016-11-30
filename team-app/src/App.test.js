import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import {shallow} from 'enzyme';
import sinon from 'sinon';
import SignUpForm from './TeamSignUp';
import {EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput} from './TeamSignUp';
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('Form reset button', () => {
  it('should clear out any type entries', () => {
    const wrapper = mount(<SignUpForm />);
    wrapper.find('#email').simulate('change', { target:{value:''}});
    wrapper.find('#name').simulate('change', { target:{value:''}});
    wrapper.find('#dob').simulate('change', { target:{value:''}});
    wrapper.find('#password').simulate('change', { target:{value:''}});
    wrapper.find('#passwordConf').simulate('change', { target:{value:''}});
    wrapper.find('#resetButton').simulate('click');

    expect(wrapper.state().email.value).toEqual('');
    expect(wrapper.state().name.value).toEqual('');
    expect(wrapper.state().dob.value).toEqual('');
    expect(wrapper.state().password.value).toEqual('');
    expect(wrapper.state().passwordConf.value).toEqual('');
  });

  it('should call handleReset', () => {
    var resetSpy = sinon.spy(SignUpForm.prototype, 'handleReset'); //resetSpy
    const wrapper = shallow(<SignUpForm />);
    wrapper.find('#resetButton').simulate('click');
    expect(resetSpy.called).toEqual(true); //resetSpy
  });
});