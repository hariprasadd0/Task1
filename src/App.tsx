import {Dashboard} from "./components/ui/Dashboard";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {ProtectedRoute} from "./components/auth/protectedRoute.tsx";
import {Layout} from './components/layout/Layout.tsx'
function App() {
  return (
    <AuthProvider>
        <ProtectedRoute>
            <Layout>
        <Dashboard/>
            </Layout>
        </ProtectedRoute>
    </AuthProvider>
  )
}

export default App
