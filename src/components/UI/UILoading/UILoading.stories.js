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

export const Black = Template.bind({});
Black.args = {
	...props,
	theme: "black",
    isShadow: false,
};

export const White = Template.bind({});
White.args = {
	...props,
	theme: "white",
    isShadow: true,
};

export const Violet = Template.bind({});
Violet.args = {
	...props,
	theme: "violet",
    isShadow: false,
};
