import React from 'react'

export const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  )
}

Header.defaultProps = {
  title:"Default Prop"
}
export default Header;