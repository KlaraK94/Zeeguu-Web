import { NavLink } from 'react-router-dom'

function WordsTab ({ id, text, link, isActive }) {
  return (
    <div className='row__tab'>
      <NavLink
        id={id}
        className={'headmenuTab'}
        to={link}
        exact
        activeStyle={{ fontWeight: 600 }}
      >
        {text}
      </NavLink>
    </div>
  )
}

function SeparatorBar () {
  return (
    <div className='row__bar'>
      <div className='bar'></div>
    </div>
  )
}

export { WordsTab, SeparatorBar }
