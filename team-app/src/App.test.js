import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import SignUpForm from './TeamSignUp';
import {EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput} from './TeamSignUp';
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// Test for reset button

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
    var spy = sinon.spy(SignUpForm.prototype, 'handleReset'); 
    const wrapper = shallow(<SignUpForm />);
    wrapper.find('#resetButton').simulate('click');
    expect(spy.called).toEqual(true); 
  });
});

// Test for password confirmation
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

// Test for email input
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


// Test for name input
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


// Test for birthday input
describe('<BirthdayInput /> component', () => {
  it('should require birthday field', () => {
    const wrapper = shallow(<BirthdayInput value='' />);
    expect(wrapper.find('.error-missing').text()).toEqual('we need to know your birthdate')
      && expect(wrapper.find('.error-invalid').length).toEqual(0)
      && expect(wrapper.find('.error-not-old').length).toEqual(0);
  });

  it('should require valid date', () => {
    const wrapper = shallow(<BirthdayInput value='this is a string, not a date' />);
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

    wrapper = shallow(<BirthdayInput value='Wednesday March 25 2015' />);
    expect(wrapper.find('.error-invalid').length).toEqual(0);
  });

  it('should require age of 13 or older', () => {
    const wrapper = shallow(<BirthdayInput value='Mar 25 2015' />);
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

  // Test for submit button

  describe('Submit button', () => {
    it('should be enabled if all of the forms are valid', () => {
      const wrapper = mount(<TeamSignUp />);
      const email = 'jonjewik@gmail.com';
      const name = 'jonjewik';
      const dob = '1';
      const password = 'helpme';

      wrapper.find('#email').simulate('change', { target: { value: email } });
      wrapper.find('#name').simulate('change', { target: { value: name } });
      wrapper.find('#dob').simulate('change', { target: { value: dob } });
      wrapper.find('#password').simulate('change', { target: { value: password } });
      wrapper.find("#passwordConf").simulate('change', { target: { value: password } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(false);


    });

    it('should be disabled if any of the forms are invalid', () => {
      const wrapper = mount(<TeamSignUp />);
      const email = 'jonjewik';
      const name = 'jonjewik';
      const dob = '1';
      const password = 'helpme';

      wrapper.find('#email').simulate('change', { target: { value: 'INVALID EMAIL' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find('#email').simulate('change', { target: { value: email } });

      wrapper.find('#name').simulate('change', { target: { value: '' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find('#name').simulate('change', { target: { value: name } });

      wrapper.find('#dob').simulate('change', { target: { value: 'HI CAMERON' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find('#dob').simulate('change', { target: { value: dob } });

      wrapper.find('#password').simulate('change', { target: { value: '' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find('#password').simulate('change', { target: { value: password } });

      wrapper.find("#passwordConf").simulate('change', { target: { value: '' } });
      expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
      wrapper.find("#passwordConf").simulate('change', { target: { value: password } });
    })

    it('should handle submit callback in App (using sinon)', () => {

      const handleSubmitSpy = sinon.spy(App.prototype, 'handleSubmit');
      const wrapper = mount(<App />);

      const email = 'jonjewik@gmail.com';
      const name = 'jonjewik';
      const dob = '1';
      const password = 'helpme';

      wrapper.find('#email').simulate('change', { target: { value: email } });
      wrapper.find('#name').simulate('change', { target: { value: name } });
      wrapper.find('#dob').simulate('change', { target: { value: dob } });
      wrapper.find('#password').simulate('change', { target: { value: password } });
      wrapper.find('#passwordConf').simulate('change', { target: { value: password } });

      wrapper.find('form').simulate('submit');

      expect(handleSubmitSpy.called).toEqual(true);
      expect(wrapper.find('.alert-success').length).toEqual(1);

    });

    it('should show the proper alert-success element when submit is clicked', () => {
      const wrapper = mount(<App />);

      const email = 'jonjewik@gmail.com';
      const name = 'jonjewik';
      const dob = '1';
      const password = 'helpme';

      wrapper.find('#email').simulate('change', { target: { value: email } });
      wrapper.find('#name').simulate('change', { target: { value: name } });
      wrapper.find('#dob').simulate('change', { target: { value: dob } });
      wrapper.find('#password').simulate('change', { target: { value: password } });
      wrapper.find('#passwordConf').simulate('change', { target: { value: password } });

      wrapper.find('form').simulate('submit');

      expect(wrapper.find('.alert-success').length).toEqual(1);
    });
  });


});
