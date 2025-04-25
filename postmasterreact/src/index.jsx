import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import Layout from './Layout';
import Page_ToDos from './Page_ToDos';
import Page_AddToDo from './Page_AddToDo';
import Page_EditToDo from './Page_EditToDo';
import Page_Login from './Page_Login';
import Page_NotFound from './Page_NotFound';
import { ContextError_Provider } from './ContextError';
import { ContextUser_Provider } from './ContextUser';
import ProtectedRoute from './ProtectedRoute';
import Page_Register from './Page_Register';
import Page_Profile from './Page_Profile';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <ContextError_Provider>
        <ContextUser_Provider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={
                        <ProtectedRoute>
                            <Page_ToDos />
                        </ProtectedRoute>
                    } />
                    <Route path="add-todo" element={
                        <ProtectedRoute>
                            <Page_AddToDo />
                        </ProtectedRoute>
                    } />
                    <Route path="edit-todo/:id" element={
                        <ProtectedRoute>
                            <Page_EditToDo />
                        </ProtectedRoute>
                    } />
                    <Route path="profile/" element={
                        <ProtectedRoute>
                            <Page_Profile />
                        </ProtectedRoute>
                    } />
                    <Route path="login" element={<Page_Login />} />
                    <Route path="register" element={<Page_Register />} />
                    <Route path="*" element={<Page_NotFound />} />
                </Route>
            </Routes>
        </Router>
        </ContextUser_Provider>
    </ContextError_Provider>
)