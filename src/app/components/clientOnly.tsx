import React from "react";

export const ClientOnly = ({ children, ...delegated }: { children: any }) => {

  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null

  return (
    <React.Fragment {...delegated}>
      {children}
    </React.Fragment>
  );
}

// export default ClientOnly