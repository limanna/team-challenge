import React from 'react';
import ReactDOM from 'react-dom';
import { EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput } from './TeamSignUp';
import App from './TeamSignUp';
import {shallow} from 'enzyme';
import sinon from 'sinon';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
const wrapper = shallow(<App />);

/*describe('Email address', () => {
  it('should have the correct format', () => {
    const wrapper = shallow(<App />);
    const input = wrapper.find('#email');
    var whatWeGot = input.simulate('change', {target:{value:'b@b.com'}});
    console.log(whatWeGot.toString());
    var whatWeWant = '.com';
    expect(whatWeGot).toContain(whatWeWant);
  });
});*/


describe('email input', () => {

  it('should error if blank, and not show invalid error', () => {
    const wrapper = shallow(<EmailInput value={''}/>);
    expect(wrapper.find('.error-missing').text()).toEqual('we need to know your email address')
    && expect(wrapper.find('.error-invalid').length).toEqual(0); 
  });

  it('should show error message if inputed invalid email', () => {
    const wrapper = shallow(<EmailInput value={'error test'}/>);
    expect(wrapper.find('.error-invalid').text()).toEqual('this is not a valid email address')
  });

  it('should not show error message if email address is valid', () => {
    const wrapper = shallow(<EmailInput value={'a@a.com'}/>);
    expect(wrapper.find('.error-invalid').length).toEqual(0);
  });

  it('should call the updateParent', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<EmailInput value={''} updateParent={spy}/>);
    wrapper.find('#email').simulate('change', {target:{value: 'a@a.com'}});
    expect(spy.called).toEqual(true);
  });
});



