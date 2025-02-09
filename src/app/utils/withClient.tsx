import { useEffect, useState } from "react";

export default function withClient(Component: any) {
  return function WrappedComponent(props: any) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) return null; // Retorna `null` até que o cliente esteja carregado

    return <Component {...props} />;
  };
}
