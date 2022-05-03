import { useState } from "react";
import UIInput from "./UIInput";

export default {
    title: "UI-Kit/UIInput",
    component: UIInput
};

const Template = (arg) => {
    const [value, setValue] = useState('');

    const handleChange = (value) => {
        setValue(value);
    }

    return (
        <UIInput
            {...arg}
            value={value}
            handleChange={handleChange}
        />
    )
}

const props = {
    value: '',
	handleChange: () => console.log('input change'),
	placeholder: 'search ',
	classes: ""
}

export const Default = Template.bind({});
Default.args = {
    ...props
}