import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import DashboardContainer from "./components/DashboardContainer/DashboardContainer";
import NotesContainer from "./components/NotesContainer/NotesContainer";
import ArchiveContainer from "./components/ArchiveContainer/ArchiveContainer";
import TrashContainer from "./components/TrashContainer/TrashContainer";
import Login from "./components/Login/Login";

export default function RoutingModule (){
    const AppRoute = createBrowserRouter([
        {path: "/login", element: <Login/>},
        {path: "/signUp", element: <SignUp/>},
        {
            path: "/",
            element: <DashboardContainer/>,
            children: [
                {
                    path: "notes",
                    element: <NotesContainer/>
                },
                {
                    path: "archive",
                    element: <ArchiveContainer/>
                },
                {
                    path: "trash",
                    element: <TrashContainer/>
                }
            ]
        }
    ])
    return <RouterProvider router={AppRoute}></RouterProvider>
}   