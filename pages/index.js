import EventList from "@/components/events/EventList";

function HomePage(props) {

  return (
    <div>
      <EventList events={props.featuredEvents}/>
    </div>
  );
}

export async function getStaticProps() {
  return fetch('https://nextjs-course-cea5e-default-rtdb.firebaseio.com/events.json?orderBy="isFeatured"&equalTo=true')
    .then(response => response.json())
    .then(data => {
      const transformedData = [];
      for (const key in data){
        transformedData.push(
          {
            id: key,
            date: data[key].date,
            description: data[key].description,
            image: data[key].image,
            isFeatured: data[key].isFeatured,
            location: data[key].location,
            title: data[key].title})
      }
      return {
        props: {
          featuredEvents: transformedData
        },
        revalidate: 300
      }
    })

}

export default HomePage;