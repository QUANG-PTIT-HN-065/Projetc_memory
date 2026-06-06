import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

export default function RouteLoader({ children }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}