import EventList from "@/components/events/EventList";
import Head from "next/head";

function HomePage(props) {

  return (
    <div>
      <Head>
        <title>Nextjs Events</title>
        <meta name="description" content="Search for local events"/>
      </Head>
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