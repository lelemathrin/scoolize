import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        question1: '',
        question2: [],
        question3: '',
        question4: '',
        // Add more questions as needed
    });

    const updateFormData = (questionKey, answer) => {
        setFormData(prevData => ({
            ...prevData,
            [questionKey]: answer,
        }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};
