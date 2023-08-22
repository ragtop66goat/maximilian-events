import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import {useRouter} from "next/router";

function AllEventsPage(props) {

    const router = useRouter();

    function findEventsHandler(month, year) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return <>
        <EventsSearch onSearch={findEventsHandler}/>
        <EventList events={props.events}/>
    </>
}

export async function getStaticProps() {
    return fetch('https://nextjs-course-cea5e-default-rtdb.firebaseio.com/events.json')
      .then(response => response.json())
      .then(data => {
          const events = [];
          for(let key in data){
              events.push({
                  id: key,
                  image: data[key].image,
                  isFeatured: data[key].isFeatured,
                  location: data[key].location,
                  title: data[key].title,
                  description: data[key].description,
                  date: data[key].date,
              })
          }

          return {props: {events: events}, revalidate: 60}
      })
}

export default AllEventsPage;