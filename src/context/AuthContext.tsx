import API from '@/api/apiClient'
import { AppRoutes } from '@/routes/routeUtils'
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: number
  roleName: string
  empNo: string
  name: string
  L1UserId: number
  roleId: number
  L1EmpNo: string
  L1EmpName: string
  iat: number
  canEdit: boolean
  GMSSiteId: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  logout: () => void
  hasPermission: (role: number[]) => boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: true,
  loading: false,
  logout: () => {},
  hasPermission: () => false,
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const verifyToken = async (token: string): Promise<User> => {
    // Your token verification logic
    const response = await API.get('users/info', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data.user
  }
  useEffect(() => {
    // Check if user is authenticated on app start
    const checkAuth = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('authToken')
        if (token) {
          // Verify token and get user data
          const userData = await verifyToken(token)
          setUser(userData)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('authToken')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const hasPermission = (role: number[]): boolean => {
    return role.includes(user?.roleId || -1)
  }

  const logout = () => {
    // Clear all authentication data
    localStorage.removeItem('authToken')
    localStorage.removeItem('user') // Clear any cached user data

    // Clear user state
    setUser(null)

    // window.location.href = `${window.location.origin}/IPAM_AJ${AppRoutes.LOGIN}`
    // Navigate to login with replace to prevent going back
    navigate(AppRoutes.LOGIN, { replace: true })

    // Optional: reload page to clear all state
  }

  // const verifyToken = async (token: string): Promise<User> => {
  //   // Your token verification logic
  //   const response = await fetch('IPAM_NJ/api/verify', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })

  //   if (!response.ok) {
  //     throw new Error('Token verification failed')
  //   }

  //   return response.json()
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
        hasPermission,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
