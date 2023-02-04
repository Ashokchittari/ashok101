import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const NoPassword = () => (
  <div className="no-pswd-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
      alt="no passwords"
      className="nopassword"
    />
    <p className="text">No Passwords</p>
  </div>
)

const RenderPassword = params => {
  const {props, isChecked, deletePswd} = params
  const {websiteName, username, password, id} = props
  const firstLetter = props.websiteName[0]
  const newpassword = isChecked ? (
    password
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-img"
    />
  )
  const deletePassword = () => {
    deletePswd(id)
  }
  return (
    <li className="main-container-3">
      <h1 className="letter-background">{firstLetter}</h1>
      <div>
        <p>{websiteName}</p>
        <p>{username}</p>
        <p>{newpassword}</p>
      </div>
      <div>
        <button type="button" onClick={deletePassword} data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

class App extends Component {
  state = {
    websiteName: '',
    isChecked: false,
    username: '',
    password: '',
    passwordList: [],
    searchInput: '',
  }

  changeWebsiteName = event => {
    this.setState({websiteName: event.target.value})
  }

  toggleCheck = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {websiteName, username, password} = this.state
    const newPassword = {
      id: v4(),
      websiteName,
      username,
      password,
    }
    this.setState(prev => ({
      passwordList: [...prev.passwordList, newPassword],
      username: '',
      websiteName: '',
      password: '',
    }))
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const newPasswordList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: newPasswordList})
  }

  changeSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {
      websiteName,
      isChecked,
      username,
      password,
      searchInput,
      passwordList,
    } = this.state
    const searchedList = passwordList.filter(each =>
      each.websiteName.toUpperCase().includes(searchInput.toUpperCase()),
    )
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="main-container">
          <div className="input-container">
            <h1 className="add-password">Add New Password</h1>
            <form onSubmit={this.addPassword}>
              <div className="input-1">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-img"
                />
                <input
                  type="text"
                  onChange={this.changeWebsiteName}
                  placeholder="Enter Website"
                  value={websiteName}
                />
              </div>
              <div className="input-2">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="username-img"
                />
                <input
                  type="text"
                  onChange={this.changeUserName}
                  placeholder="Enter Username"
                  value={username}
                />
              </div>
              <div className="input-3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="password-img"
                />
                <input
                  type="password"
                  onChange={this.changePassword}
                  placeholder="Enter Password"
                  value={password}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </div>
        </div>
        <div className="main-container-2">
          <nav className="nav-bar">
            <div>
              <h1>Your Passwords </h1>
              <p>{searchedList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.changeSearch}
              />
            </div>
          </nav>
          <hr className="hr-line" />
          <div className="show-password-container">
            <div>
              <input
                id="show-pswd"
                type="checkbox"
                onClick={this.toggleCheck}
              />
              <label htmlFor="show-pswd">Show Passwords</label>
            </div>
          </div>
          <ul className="list">
            {passwordList.length === 0 ? (
              <NoPassword />
            ) : (
              searchedList.map(each => (
                <RenderPassword
                  props={each}
                  isChecked={isChecked}
                  deletePswd={this.deletePassword}
                  key={each.id}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
