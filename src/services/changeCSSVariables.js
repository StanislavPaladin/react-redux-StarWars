export const changeCSSVariables = (theme) => {
	const root = document.querySelector(":root");
	const elementsToChange = ['header', 'bg', 'nav', 'box-shadow'];
	elementsToChange.forEach(item => {
		root.style.setProperty(`--theme-default-${item}`, `var(--theme-${theme}-${item})`);
	})
	
};
