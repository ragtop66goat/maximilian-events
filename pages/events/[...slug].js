import ResultsTitle from "@/components/events/results-title";
import EventList from "@/components/events/EventList";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import {useEffect, useState} from "react";

function FilteredEventsPage(props) {

  const [filteredEvents, setFilteredEvents] = useState([])

    useEffect(() => {
      fetch(`https://nextjs-course-cea5e-default-rtdb.firebaseio.com/events.json?orderBy="date"&startAt="${props.year}-${props.month}-01"&endAt="${props.year}-${props.month}-31"`)
          .then(response => response.json())
          .then(data => {
            const events = [];
            for (let key in data) {
              events.push(
                {
                  id: key,
                  date: data[key].date,
                  location: data[key].location,
                  title: data[key].title,
                  description: data[key].description,
                  image: data[key].image,
                  isFeatured: data[key].isFeatured
                })
            }
            setFilteredEvents(events);
          })

    }, [])

  if (props.hasError || filteredEvents.length < 1) {
    return (
      <>
        <ErrorAlert>
          <p className='center'>No events found</p>
        </ErrorAlert>
        <div className='center'>
          <Button link="/events">Back</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.year, props.month - 1);

  return <>
    <ResultsTitle date={date}/>
    <EventList events={filteredEvents}/>
  </>
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;
  const filterYear = filterData[0];
  const filterMonth = filterData[1];
  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {props: {hasError: true}};
  }
  return {props: {year: filterYear, month: filterMonth}}
}

export default FilteredEventsPage;