import { Suspense } from "react";
import ArticleDetail from "./detail-article";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading article detail...</div>}>
      <ArticleDetail />
    </Suspense>
  );
}
