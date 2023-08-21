import {useRouter} from "next/router";
import {getFilteredEvents} from "@/dummy-data";
import ResultsTitle from "@/components/events/results-title";
import EventList from "@/components/events/EventList";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) return <p className='center'>Loading...</p>;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return (
      <>
        <ErrorAlert>
          <p className='center'>Please check the filter values</p>
        </ErrorAlert>
        <div className='center'>
          <Button className='center' link="/events">Back</Button>
        </div>
      </>
    );

  }

  const filteredEvents = getFilteredEvents({year: numYear, month: numMonth});

  if (!filteredEvents || filteredEvents.length < 1) {
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

  const date = new Date(numYear, numMonth - 1);

  return <>
    <ResultsTitle date={date}/>
    <EventList events={filteredEvents}/>
  </>
}

export default FilteredEventsPage;