import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import SubstancePage from "./pages/SubstancePage/SubstancePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import SubstancesPage from "./pages/SubstancesPage/SubstancesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import CosmeticConstructor from "./components/CosmeticConstructor/CosmeticConstructor";
import CosmeticPage from "./pages/CosmeticPage/CosmeticPage";
import CosmeticsPage from "./pages/CosmeticsPage/CosmeticsPage";
import SubstanceEditPage from "./pages/SubstanceEditPage/SubstanceEditPage";
import SubstanceAddPage from "./pages/SubstanceAddPage/SubstanceAddPage";
import SubstancesList from "./pages/SubstancesPage/SubstancesList/SubstancesList";
import SubstancesTableWrapper from "./pages/SubstancesPage/SubstancesTableWrapper/SubstancesTableWrapper";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const description = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && description.pathname.endsWith("substances-list") && <CosmeticConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/services">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/substances-list" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/substances-list" element={<SubstancesList />} />

                                    <Route path="/substances-table" element={<SubstancesTableWrapper />} />

                                    <Route path="/substances/add" element={<SubstanceAddPage />} />

                                    <Route path="/substances/:id" element={<SubstancePage />} />

                                    <Route path="/substances/:id/edit" element={<SubstanceEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/cosmetics/:id" element={<CosmeticPage />} />

                                    <Route path="/cosmetics" element={<CosmeticsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
