
export const checkValidate = (name, email, password) => {
    const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)
    const isNameValid = /^[A-Za-z' -]+$/.test(name)

    return {
        isValid: isEmailValid && isPasswordValid && isNameValid,
        formField: {
            name: !isNameValid,
            email: !isEmailValid,
            password: !isPasswordValid
        }
    }
}