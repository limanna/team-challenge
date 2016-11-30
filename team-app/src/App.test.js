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
<<<<<<< HEAD
})
=======


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
      const email = 'jonjewik@gmail.com';
      const name = 'jonjewik';
      const dob = '1';
      const password = 'helpme';

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
      const email = 'jonjewik';
      const name = 'jonjewik';
      const dob = '1';
      const password = 'helpme';

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
      const email = 'jonjewik@gmail.com';
      const name = 'jonjewik';
      const dob = '1';
      const password = 'helpme';

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
      const email = 'jonjewik@gmail.com';
      const name = 'jonjewik';
      const dob = '1';
      const password = 'helpme';

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
>>>>>>> f4d24274fb5789289baf936353ecca2779fbf3db
