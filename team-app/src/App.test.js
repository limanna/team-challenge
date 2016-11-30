import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput } from './TeamSignUp';
import App from './TeamSignUp';
import {shallow} from 'enzyme';
import sinon from 'sinon';

=======
import App from './App';
import { shallow } from 'enzyme';
import sinon from 'sinon';
>>>>>>> 2c594bbe66d626c3535218f6d5c2a2ec48d40b9b

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
<<<<<<< HEAD
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



describe('name input', () => {
  it('should show error if textbox is empty', () => {
    const wrapper = shallow(<RequiredInput field={"name"} value={''} errorMessage={"we need to know your name"} />);
    expect(wrapper.find('.error-missing').text()).toEqual("we need to know your name");

  });

  it('should not show error if textbox isnt empty', () => {
    const wrapper = shallow(<RequiredInput field={"name"} value={'Nemo'} />);
    expect(wrapper.find('.error-missing').length).toEqual(0);

  });

  it('should call updateParent', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<RequiredInput id="name" field="name" type="text"
          label="Name" placeholder="your name"
          errorMessage="we need to know your name"
          value={''}
          updateParent={spy}/>);
    wrapper.find('#name').simulate('change', {target:{value: 'Dory'}});
    expect(spy.called).toEqual(true);
  });
})