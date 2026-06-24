import { Routes, Route, Outlet } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppWidget from './components/WhatsAppWidget.jsx';
import StickyCTA from './components/StickyCTA.jsx';

import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Books from './pages/Books.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Book from './pages/Book.jsx';
import Schedule from './pages/Schedule.jsx';
import Survey from './pages/Survey.jsx';
import NotFound from './pages/NotFound.jsx';

import AdminApp from './pages/admin/AdminApp.jsx';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppWidget />
      <StickyCTA />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/books" element={<Books />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/book" element={<Book />} />
        {/* /schedule is intentionally unlisted — never linked from nav or buttons,
            only reachable via the link emailed after payment. */}
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/survey/:bookingId" element={<Survey />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin has its own chrome — no public navbar/footer/widgets */}
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}
