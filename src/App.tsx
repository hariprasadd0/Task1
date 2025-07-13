import {Dashboard} from "./components/ui/Dashboard";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {ProtectedRoute} from "./components/auth/protectedRoute.tsx";
function App() {
  return (
    <AuthProvider>
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
    </AuthProvider>
  )
}

export default App
