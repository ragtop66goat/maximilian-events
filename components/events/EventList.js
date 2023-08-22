import EventItem from "@/components/events/EventItem";
import classes from "./event-list.module.css"

function EventList({events}) {

    console.log("events: " + events);

    return <ul className={classes.list}>
        {events.map((item) => <EventItem key={item.id} item={item} />)}
    </ul>
}

export default EventList;