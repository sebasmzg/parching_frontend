"use client";

import Footer from "@/components/common/footer/footer";
import NavBar from "@/components/common/navbar/navBar";
import EditEventForm from "@/components/eventsForm/editEvent";

export default function EventsFormPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <NavBar />
      <EditEventForm params={params} />
      <Footer />
    </>
  );
}
