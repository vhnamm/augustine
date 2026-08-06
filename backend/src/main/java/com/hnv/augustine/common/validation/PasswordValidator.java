    package com.hnv.augustine.common.validation;

    import jakarta.validation.ConstraintValidator;
    import jakarta.validation.ConstraintValidatorContext;

    import java.util.regex.Pattern;

    public class PasswordValidator implements ConstraintValidator<Password, String> {
        private Pattern pattern;

        @Override
        public void initialize(Password constraintAnnotation) {
            int min = constraintAnnotation.min();
            int max = constraintAnnotation.max();
            String regex = String.format("^(?=.*[!@#$%%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?~]).{%d,%d}$", min, max);

            this.pattern  = Pattern.compile(regex);
        }
        @Override
        public boolean isValid(String value, ConstraintValidatorContext context) {
            if (value == null) {
                return true;
            }
            return pattern.matcher(value).matches();
        }
    }
