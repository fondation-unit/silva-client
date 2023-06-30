import styled from '@emotion/styled'


interface Props {
  children: JSX.Element
  className?: string
}

const MainHeader = ({ children, className }: Props) => {
  return (
    <header className={className}>
      {children}
    </header>
  )
}

const StyledMainHeader = styled(MainHeader)`
  display: inline-flex;
  width: 100%;

  nav {
    display: flex;
    align-items: center;
    flex-grow: 1;

    ul {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      justify-content: flex-end;
      list-style: none;
      padding-left: 0;
    }
  }
`

export default StyledMainHeader