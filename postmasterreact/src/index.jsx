import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/style.css';
import Layout from './Layout';
import Page_NotFound from './pages/Page_NotFound';
import Page_Home from './pages/Page_Home';
import { ContextError_Provider } from './ContextError';
import Page_Collections from './pages/Page_Collections';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <ContextError_Provider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Page_Home />} />
                    <Route path="*" element={<Page_NotFound />} />
                    <Route path="collections" element={<Page_Collections />} />
                </Route>
            </Routes>
        </Router>
    </ContextError_Provider>
)