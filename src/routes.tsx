import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { FilesProvider } from './context/files'

import Main from './pages/Main/'
import Convert from './pages/Convert/'

const Routes: React.FC = () => {
  return (
    <FilesProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/convert" exact component={Convert} />
        </Switch>
      </Router>
    </FilesProvider>
  )
}

export default Routes
