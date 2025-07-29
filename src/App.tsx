import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import WomenWithBankAccess from "./pages/WomenWithBankAccess";
import CommunityMembersReached from "./pages/CommunityMembersReached";
import CoordinatorsCapacitated from "./pages/CoordinatorsCapacitated";
import LawEnforcementAgentsTrained from "./pages/LawEnforcementAgentsTrained";
import SchoolsWithMechanisms from "./pages/SchoolWithMechanisms";
import VAWCCases from "./pages/VAWCCases";
import WomenWhoSoughtHelp from "./pages/WomenWhoSoughtHelp";


export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100 font-sans">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bank-access" element={<WomenWithBankAccess />} />
            <Route path="/community-reached" element={<CommunityMembersReached />} />
            <Route path="/coordinators-capacitated" element={<CoordinatorsCapacitated />} />
            <Route path="/agents-trained" element={<LawEnforcementAgentsTrained/> } />
            <Route path="/school-mechanisms" element={<SchoolsWithMechanisms/>} />
            <Route path="/vawc-cases" element={<VAWCCases/>}/>
            <Route path="/women-help" element={<WomenWhoSoughtHelp/>}/>
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}