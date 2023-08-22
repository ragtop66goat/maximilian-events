import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";

function EventDetailPage(props) {

  const event = props.selectedEvent[0];

  if (!event) return <h1>No Event Found </h1>

  return (
    <>
      <EventSummary title={event.title}/>
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export async function getStaticProps(context) {
  const eventId = context.params.eventid;
  return fetch(`https://nextjs-course-cea5e-default-rtdb.firebaseio.com/events.json?orderBy="id"&equalTo="${eventId}"`)
    .then(response => response.json())
    .then(data => {
      const selectedEvent = [];
      for (const key in data) {
        selectedEvent.push({
          id: key,
          description: data[key].description,
          image: data[key].image,
          isFeatured: data[key].isFeatured,
          title: data[key].title,
          location: data[key].location
        })
      }
      return {props: {selectedEvent: selectedEvent}};
    })
}

export async function getStaticPaths() {
  return fetch('https://nextjs-course-cea5e-default-rtdb.firebaseio.com/events.json')
    .then(response => response.json())
    .then(data => {
      const ids = [];
      for(const key in data) {
        ids.push({params: {eventid: key}})
      }
      return {
        paths: ids,
        fallback: true
      }
    })
}

export default EventDetailPage;