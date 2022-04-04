import PeoplePage from "@containers/PeoplePage";
import HomePage from "@containers/HomePage";

const routesConfig = [
	{
		path: "/",
		exact: true,
		element: <HomePage />,
	},
    {
		path: "/people",
		exact: true,
		element: <PeoplePage />,
	},
];

export default routesConfig;