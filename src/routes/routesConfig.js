import PeoplePage from "@containers/PeoplePage";
import HomePage from "@containers/HomePage";
import NotFoundPage from "@containers/NotFoundPage";
import CharacterPage from "@containers/CharacterPage";
import FavoritesPage from "@containers/FavoritesPage/FavoritesPage";

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
		path: "/people/:id",
		exact: true,
		element: <CharacterPage />,
	},
	{
		path: "/favorites",
		exact: true,
		element: <FavoritesPage />,
	},
];

export default routesConfig;