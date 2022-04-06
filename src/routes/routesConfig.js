import PeoplePage from "@containers/PeoplePage";
import HomePage from "@containers/HomePage";
import NotFoundPage from "@containers/NotFoundPage";
import CharacterPage from "@containers/CharacterPage";

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
	{
		path: "*",
		exact: false,
		element: <NotFoundPage />,
	},
	{
		path: "/not-found",
		exact: true,
		element: <NotFoundPage />,
	},
	{
		path: "/character",
		exact: true,
		element: <CharacterPage />,
	},
];

export default routesConfig;