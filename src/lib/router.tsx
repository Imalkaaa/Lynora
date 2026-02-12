import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type RouterContextType = {
  currentPath: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
};

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
  params: {},
});

export const useRouter = () => useContext(RouterContext);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentPath(hash);

      const matches = hash.match(/\/product\/([^\/]+)/);
      if (matches) {
        setParams({ slug: matches[1] });
      } else {
        setParams({});
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}
