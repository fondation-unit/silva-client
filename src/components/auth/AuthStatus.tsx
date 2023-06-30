import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME } from '../../config'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { useAuth } from './Auth'
import { StyledButton } from '../Button'
import styled from '@emotion/styled'
import { theme } from '../../config'


interface Props {
  children: JSX.Element
  className?: string
}

const Username = ({ children, className }: Props) => <span className={className}>{children}</span>

const StyledUsername = styled(Username)`
  color: ${theme.colors.secondary}
`

export const AuthStatus = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)
  const [isPushed, setIsPushed] = useState<boolean>(false)

  const handleSubmit = () => {
    setIsPushed(true)
    auth.signout(() => {
      navigate("/")
      setIsPushed(false)
    })
  }

  if (!authToken) {
    return (
      <>
        <p>You are not logged in.<br /><Link to="/login">Sign in</Link> or <Link to="/register">register</Link>.</p>
      </>
    )
  }

  return (
    <p>
      <StyledUsername>
        <>
          Welcome {authState.email || localStorage.getItem("user")}
        </>
      </StyledUsername>
      <StyledButton
        label="Sign out"
        callback={() => handleSubmit()}
        isPushed={isPushed}
        disabled={isPushed}
      />
    </p>
  )
}