import * as Yup from "yup";

function configureValidations() {
  Yup.addMethod(Yup.string, 'firstLetterUppercase', function() {
    return this.test('first-letter-uppercase', 'The first letter must be uppercase', 
        function(value) {
            if (value && value.length > 0) {
                // return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
                const firstLetter = value.substring(0, 1);
                return firstLetter === firstLetter.toUpperCase();
            }
      return true;
    });
  });
}

export default configureValidations;