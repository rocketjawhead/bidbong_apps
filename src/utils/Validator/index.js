/**
 * @name Class Field Validator
 * @version 1.0
 * @description Create a chainable validation method for input fields
 * @todo current way of displaying error text is dependendent on dictionary.json. will need this validation independent.
 */
class Validator {
  constructor(val) {
    this.val = val;
    this.error = [];
  }

  isRequired() {
    if (!this.val) {
      this.error.push('form.notes.isRequired');
    }
    return this;
  }

  alphabetOnly() {
    const regex = /[^a-zA-Z ]/;
    if (regex.test(this.val)) {
      this.error.push('form.notes.recipientNameAlphabetOnly');
    }
    return this;
  }

  isEmail() {
    // eslint-disable-next-line no-useless-escape
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.val && !filter.test(this.val)) {
      this.error.push('Invalid Email');
    }
    return this;
  }

  isPassword() {
    const lowercase = /(?=.*[a-z])/;
    const uppercase = /(?=.*[A-Z])/;
    const numeric = /(?=.*[0-9])/;
    const minimal = /(?=.{6,})/;
    if (this.val) {
      if (!lowercase.test(this.val)) {
        this.error.push('form.notes.passLowerCase');
      }

      if (!uppercase.test(this.val)) {
        this.error.push('form.notes.UperCase');
      }

      if (!numeric.test(this.val)) {
        this.error.push('form.notes.passNumeric');
      }

      if (!minimal.test(this.val)) {
        this.error.push('form.notes.passwordLength');
      }
    }
    return this;
  }

  numberOnly() {
    const regex = /[^0-9]/;
    if (regex.test(this.val)) {
      this.error.push('form.notes.recipientPhoneNumberOnly');
    }
    return this;
  }

  isAddress() {
    const regex = /^[a-zA-Z0-9 .,/]+$/im;
    if (this.val && !regex.test(this.val)) {
      this.error.push('form.notes.addressValidation');
    }
    return this;
  }
}

export default Validator;
