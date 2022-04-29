import UILoading from "./UILoading";

export default {
	title: "UI/UILoading",
	component: UILoading,
};

const Template = (args) => <UILoading {...args} />;

const props = {
	isShadow: false,
	theme: "black",
	classes: "",
};

export const Dark = Template.bind({});
Dark.args = {
	...props,
	theme: "dark",
    isShadow: false,
};

export const Light = Template.bind({});
Light.args = {
	...props,
	theme: "light",
    isShadow: true,
};

export const Robo = Template.bind({});
Robo.args = {
	...props,
	theme: "robo",
    isShadow: false,
};
