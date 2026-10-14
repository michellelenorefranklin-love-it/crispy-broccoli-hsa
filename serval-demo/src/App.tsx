import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Shell } from './components/Shell'
import EmployeeExperience from './pages/EmployeeExperience'
import Onboarding from './pages/Onboarding'
import Access from './pages/Access'
import Support from './pages/Support'
import WorkflowStudio from './pages/WorkflowStudio'
import Change from './pages/Change'
import Value from './pages/Value'
import Architecture from './pages/Architecture'
import CurrentState from './pages/CurrentState'
import Decisions from './pages/Decisions'
import SpeakerScript from './pages/SpeakerScript'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/speaker-script" element={<SpeakerScript />} />
        <Route element={<Shell />}>
          <Route index element={<Navigate to="/employee" replace />} />
          <Route path="/employee" element={<EmployeeExperience />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/access" element={<Access />} />
          <Route path="/support" element={<Support />} />
          <Route path="/workflow" element={<WorkflowStudio />} />
          <Route path="/change" element={<Change />} />
          <Route path="/value" element={<Value />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/current-state" element={<CurrentState />} />
          <Route path="/decisions" element={<Decisions />} />
          <Route path="*" element={<Navigate to="/employee" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
