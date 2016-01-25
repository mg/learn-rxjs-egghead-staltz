import React from 'react'
import { Link } from 'react-router'
const links= [
  { to: '/v1', label: 'Video 1' },
  { to: '/v2', label: 'Video 2' },
  { to: '/v3', label: 'Video 3' },
  { to: '/v4', label: 'Video 4' },
]

const Menu= ({locale, setLocale}) =>
  <ul style={styles.ul}>
    {links.map((link, idx) =>
      <li style={styles.li} key={idx}>
        <Link style={styles.link} activeStyle={styles.activeLink} {...link}>{link.label}</Link>
      </li>
    )}
  </ul>

const Main= ({locale, setLocale, children}) =>
  <div style={{display: 'flex'}}>
    <Menu locale={locale} setLocale={setLocale}/>
    <div style={{flexGrow: 1}}>
      {children}
    </div>
  </div>

export default Main

let styles= {
  ul: {
    margin: 0,
    padding: 0,
    width: 100,
  },

  li: {
    listStyleType: 'none',
    padding: 2,
    marginRight: 5,
  },

  liLocale: {
    marginTop: 2,
  },

  link: {
    color: 'black',
    textDecoration: 'none',
    display: 'block',
    padding: '4px 8px',
  },

  activeLink: {
    color: 'white',
    backgroundColor: 'black',
  },
}
