import { fetchMoviesById } from "@/actions/fetch-movies";
import React from "react";
import PageDetailSection from "@/components/PageDetailSection";

const PageDetail = async (id) => {
  let movieById = await fetchMoviesById(id.params.id);
  return (
    <main className="flex min-h-screen items-center justify-center">
      <PageDetailSection movieById={movieById} />
    </main>
  );
};

export default PageDetail;
