import "./styles/main.sass"
import "./styles/reset.sass"
import { useState } from 'react'
import Header from "./components/Header/Header";
import {Substance} from "./utils/types";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import SubstancePage from "./pages/SubstancePage/SubstancePage";
import SubstancesList from "./pages/SubstancesList/SubstancesList";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {

    const [selectedSubstance, setSelectedSubstance] = useState<Substance | undefined>(undefined)

    return (
        <BrowserRouter basename="/cosmetic">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper">

                        <Breadcrumbs selectedSubstance={selectedSubstance} setSelectedSubstance={setSelectedSubstance}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/substances" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/substances" element={<SubstancesList />} />

                            <Route path="/substances/:id" element={<SubstancePage selectedSubstance={selectedSubstance} setSelectedSubstance={setSelectedSubstance} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
