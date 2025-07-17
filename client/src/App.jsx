import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NotAuthorized from './pages/NotAuthorized';
import ProtectedRoute from './components/ProtectedRoute';
import { CssBaseline } from '@material-ui/core';

const App = () => {
    return (
        <SettingsProvider>
            <CssBaseline />
            <Router>
                <div className="app">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <ProtectedRoute 
                            path="/dashboard" 
                            component={Dashboard} 
                        />
                        <ProtectedRoute 
                            path="/settings" 
                            component={Settings} 
                            roles={['admin']} 
                        />
                        <Route path="/not-authorized" component={NotAuthorized} />
                        <Route path="/" exact>
                            <Redirect to="/login" />
                        </Route>
                        <Route path="*">
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </SettingsProvider>
    );
};

export default App;