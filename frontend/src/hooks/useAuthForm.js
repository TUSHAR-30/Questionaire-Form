import { useState } from 'react';

const useAuthForm = (initialState, validate) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((Object.keys(errors).length != 0)) {
            handleErors(name, value);
        }
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleErors = (name, value) => {
        const errorMessage = validate(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
        return errorMessage;
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return {
        formData,
        setFormData,
        errors,
        isPasswordVisible,
        handleChange,
        handleErors,
        togglePasswordVisibility,
        setErrors
    };
};

export default useAuthForm;
