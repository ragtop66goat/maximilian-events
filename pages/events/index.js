import {getAllEvents} from "@/dummy-data";
import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import {Fragment} from "react";
import {useRouter} from "next/router";

function AllEventsPage() {

    const events = getAllEvents();
    const router = useRouter();

    function findEventsHandler(month, year) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return <Fragment>
        <EventsSearch onSearch={findEventsHandler}/>
        <EventList events={events}/>
    </Fragment>
}

export default AllEventsPage;