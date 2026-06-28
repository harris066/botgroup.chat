import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes';
import { useTheme } from './hooks/use-theme';

function App() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // 强制设置一个假的登录 token，绕过登录检查
    localStorage.setItem('token', 'bypass-login');
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
        theme={resolvedTheme}
      />
    </>
  );
}

export default App;
