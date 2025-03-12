import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

const PublicRoute = ({ children }: { children?: ReactNode }) => (
  <>
    {children}
    <Outlet />
  </>
);

export default PublicRoute;
