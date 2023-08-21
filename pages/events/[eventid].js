import {useRouter} from "next/router";
import {getEventById} from "@/dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import {Fragment} from "react";

function EventDetailPage() {

    const router = useRouter();
    const eventId = router.query.eventid;
    const event = getEventById(eventId);

    if(!event) return <h1>No Event Found </h1>

    return (
      <Fragment>
          <EventSummary title={event.title}/>
        <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    )
}

export default EventDetailPage;