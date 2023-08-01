
type Values = {
    [key: string]: string;
}

export const validateLoginForm = (values: Values) => {
    const errors = {} as Values;

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)  && values.email.length >= 10) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6 && values.password.length > 1) {
        errors.password = 'Must be atleast 6 characters';
    }

    return errors;
}

export const validateRegisterForm = (values: Values) => {
    const errors = {} as Values;

    if (!values.userName) {
        errors.userName =  'Required'
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)  && values.email.length >= 10) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6 && values.password.length > 1) {
        errors.password = 'Must be atleast 6 characters';
    }

    return errors;
}

export const validateResetPasswordForm = (values: Values) => {
    const errors  = {} as Values;

    const { email, password, confirmPassword } = values;

    if (!email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
    }

    if (!password) {
        errors.password = 'Required';
    } else if (password.length < 6 && password.length > 1) {
        errors.password = 'Must be atleast 6 characters';
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (confirmPassword.length < 6 && confirmPassword.length > 1) {
        errors.confirmPassword = 'Must be atleast 6 characters';
    }

    return errors;
}