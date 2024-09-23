'use client';

import EditEventForm from "@/components/eventsForm/editEvent";

export default function EventsFormPage({ params }: { params: { slug: string } }) {
    return( 
        <EditEventForm params={params} />
    );
}
