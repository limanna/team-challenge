import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<BirthdayInput /> component', () => {
  it('should require birthday field', () => {
    const wrapper = shallow(<BirthdayInput value='' />); // pass in a blank value prop
    expect(wrapper.find('.error-missing').text()).toEqual('we need to know your birthdate')
      && expect(wrapper.find('.error-invalid').length).toEqual(0)
      && expect(wrapper.find('.error-not-old').length).toEqual(0);
  });

  it('should require valid date', () => {
    const wrapper = shallow(<BirthdayInput value='this is a string, not a date' />); // pass in a blank value prop
    expect(wrapper.find('.error-invalid').text()).toEqual("that isn't a valid date")
      && expect(wrapper.find('.error-missing').length).toEqual(0)
      && expect(wrapper.find('.error-not-old').length).toEqual(0);
  });

  it('should require valid date', () => {
    var wrapper = shallow(<BirthdayInput value='2015-03-25' />);
    expect(wrapper.find('.error-invalid').length).toEqual(0)

    wrapper = shallow(<BirthdayInput value='03/25/2015' />);
    expect(wrapper.find('.error-invalid').length).toEqual(0)

    wrapper = shallow(<BirthdayInput value='Mar 25 2015' />);
    expect(wrapper.find('.error-invalid').length).toEqual(0)

    wrapper = shallow(<BirthdayInput value='25 Mar 2015' />);
    expect(wrapper.find('.error-invalid').length).toEqual(0)

    wrapper = shallow(<BirthdayInput value='Wednesday March 25 2015' />); // pass in a blank value prop
    expect(wrapper.find('.error-invalid').length).toEqual(0);
  });

  it('should require age of 13 or older', () => {
    const wrapper = shallow(<BirthdayInput value='Mar 25 2015' />); // pass in a blank value prop
    expect(wrapper.find('.error-not-old').text()).toEqual("sorry, you must be at least 13 to sign up")
      && expect(wrapper.find('.error-missing').length).toEqual(0)
      && expect(wrapper.find('.error-invalid').length).toEqual(0);
  });

  it('should call updateParent', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<BirthdayInput value='' updateParent={spy} />);
    wrapper.find("#dob").simulate('change', { target: { value: '2015-03-25' } });
    expect(spy.called).toEqual(true);
  });

  describe('Submit button', () => {
    it('should be enabled if all of the forms are valid', () => {
      const wrapper = mount(<TeamSignUp />);
      // valid email consts
      const email = 'valid@gmail.com';
      const name = 'validname';
      const dob = '1';
      const password = 'password';

      // simulate valid inputs
      wrapper.find('#email').simulate('change', { target: { value: email } });
      wrapper.find('#name').simulate('change', { target: { value: name } });
      wrapper.find('#dob').simulate('change', { target: { value: dob } });
      wrapper.find('#password').simulate('change', { target: { value: password } });
      wrapper.find("#passwordConf").simulate('change', { target: { value: password } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(false);




    });

    it('should be disabled if any of the forms are invalid', () => {
      const wrapper = mount(<TeamSignUp />);
      // valid email consts
      const email = 'valid@gmail.com';
      const name = 'validname';
      const dob = '1';
      const password = 'password';

      // check email field
      wrapper.find('#email').simulate('change', { target: { value: 'INVALID EMAIL' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find('#email').simulate('change', { target: { value: email } }); // change back to be valid

      // check name field
      wrapper.find('#name').simulate('change', { target: { value: '' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find('#name').simulate('change', { target: { value: name } }); // change back to be valid

      // check dob field
      wrapper.find('#dob').simulate('change', { target: { value: 'HI CAMERON' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find('#dob').simulate('change', { target: { value: dob } }); // change back to be valid

      // check password field
      wrapper.find('#password').simulate('change', { target: { value: '' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find('#password').simulate('change', { target: { value: password } }); // change back to be valid

      // check password conf field
      wrapper.find("#passwordConf").simulate('change', { target: { value: '' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find("#passwordConf").simulate('change', { target: { value: password } }); // change back to be valid
    })

    it('should handle submit callback in App (using sinon)', () => {

      // set up a sinon spy on the handleSubmit callback of the app
      const handleSubmitSpy = sinon.spy(App.prototype, 'handleSubmit');
      const wrapper = mount(<App />);

      // valid form consts
      const email = 'valid@gmail.com';
      const name = 'validname';
      const dob = '1';
      const password = 'password';

      //simulate valid inputs
      wrapper.find('#email').simulate('change', { target: { value: email } });
      wrapper.find('#name').simulate('change', { target: { value: name } });
      wrapper.find('#dob').simulate('change', { target: { value: dob } });
      wrapper.find('#password').simulate('change', { target: { value: password } });
      wrapper.find('#passwordConf').simulate('change', { target: { value: password } });

      wrapper.find('form').simulate('submit');

      expect(handleSubmitSpy.called).toEqual(true); // check the sinon spy
      expect(wrapper.find('.alert-success').length).toEqual(1); // check if the alert showed up

    });

    it('should show the proper alert-success element when submit is clicked', () => {
      const wrapper = mount(<App />);

      // valid form consts
      const email = 'valid@gmail.com';
      const name = 'validname';
      const dob = '1';
      const password = 'password';

      //simulate valid inputs
      wrapper.find('#email').simulate('change', { target: { value: email } });
      wrapper.find('#name').simulate('change', { target: { value: name } });
      wrapper.find('#dob').simulate('change', { target: { value: dob } });
      wrapper.find('#password').simulate('change', { target: { value: password } });
      wrapper.find('#passwordConf').simulate('change', { target: { value: password } });

      wrapper.find('form').simulate('submit');

      expect(wrapper.find('.alert-success').length).toEqual(1); // check if the alert showed up
    });
  });


});
});