import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const ChangePassword = () => {
  const location = useLocation()
  const navigate = useNavigate()

//   const queryParams = new URLSearchParams(location.search)
  const params = useParams()
  const email = params.email

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChangePassword = async () => {
    setError("")
    setSuccess("")

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post(`http://localhost:8000/api/v1/user/change-password/${email}`, {
        newPassword,
        confirmPassword
      })

      setSuccess(response.data.message)

      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
        console.log(err);       
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Set a new password for <span className="font-semibold">{email}</span>
        </p>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3 text-center">{success}</p>}

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            className="w-full bg-green-600 hover:bg-green-500"
            onClick={handleChangePassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Changing...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
