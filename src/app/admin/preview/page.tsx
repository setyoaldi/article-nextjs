import { Suspense } from "react";
import PreviewComponent from "./preview";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <PreviewComponent />
    </Suspense>
  );
}
