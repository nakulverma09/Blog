import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Layout from './components/Layout';
import CodingAndProjects from './pages/CodingAndProjects.jsx';
import Technology from './pages/Technology.jsx';
import Home from './pages/Home.jsx';
import EditBlog from './components/EditBlog.jsx';
import BlogPage from './components/BlogPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Miscellaneous from './pages/Miscellaneous.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CultureAndHistory from './pages/CultureAndHistory.jsx';
import NewsAndCurrentAffairs from './pages/NewsAndCurrentAffairs.jsx';
import { MantineProvider } from '@mantine/core';
import InspirationAndPersonalDevelopment from './pages/InspirationAndPersonalDevelopment.jsx';
import { AppProvider } from './context/context.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // 👈 Import ProtectedRoute component
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated.jsx'; // 👈 Import RedirectIfAuthenticated component
import CreateBlog from './components/CreateBlog.jsx';
import EducationAndLearning from './pages/EducationAndLearning.jsx';
import Lifestyle from './pages/Lifestyle.jsx';
import Finance from './pages/Finance.jsx';
import Entertainment from './pages/Entertainment.jsx';
import Profile from './components/Profile.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/home",
        element: (
            <Home />
        ),
      },
      {
        path: "/technology",
        element: (
          <ProtectedRoute>
            <Technology />
          </ProtectedRoute>
        ),
      },
      {
        path: "/education-learning",
        element: (
          <ProtectedRoute>
            <EducationAndLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lifestyle",
        element: (
          <ProtectedRoute>
            <Lifestyle />
          </ProtectedRoute>
        ),
      },
      {
        path: "/finance",
        element: (
          <ProtectedRoute>
            <Finance/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/entertainment",
        element: (
          <ProtectedRoute>
            <Entertainment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/news-current-affairs",
        element: (
          <ProtectedRoute>
            <NewsAndCurrentAffairs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inspiration-personal-development",
        element: (
          <ProtectedRoute>
            <InspirationAndPersonalDevelopment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/miscellaneous",
        element: (
          <ProtectedRoute>
            <Miscellaneous />
          </ProtectedRoute>
        ),
      },
      {
        path: "/coding-projects",
        element: (
          <ProtectedRoute>
            <CodingAndProjects />
          </ProtectedRoute>
        ),
      },
      {
        path: "/culture-history",
        element: (
          <ProtectedRoute>
            <CultureAndHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/news-current-affairs",
        element: (
          <ProtectedRoute>
            <NewsAndCurrentAffairs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-blog",
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/profile/:id",
        element: (
            <Profile />
        ),
      },
      {
        path: "/blog/:id",
        element: (
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit/blog/:id",
        element: (
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        ),
      },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/signup",
        element: (
          <RedirectIfAuthenticated>
            <Signup />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "/login",
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "/verify-email/:token",
        element: (
          <VerifyEmail/>
        ),
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <AppProvider>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </AppProvider>
    </MantineProvider>
  </StrictMode>
);
