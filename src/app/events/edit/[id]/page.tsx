"use client";

import Footer from "@/components/common/footer/footer";
import NavBar from "@/components/common/navbar/navBar";
import EditEventForm from "@/components/eventsForm/editEvent";

type Params = {
  id: string;
};

export default function EventsFormPage({
  params,
}: {
  params: Params;
}) {
  return (
    <>
      <NavBar />
      <EditEventForm params={params} />
      <Footer />
    </>
  );
}
