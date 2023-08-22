import classes from "./event-item.module.css";
import Button from "@/components/ui/Button";
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "@/components/icons/address-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import Image from "next/image";

function EventItem({item}) {

  const {title, image, date, location, id} = item;
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedAddress = location.replace(',', '\n');
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={250} height={160}/>
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon/>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon/>
            <address>{formattedAddress}</address>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <Button link={exploreLink}>
          <span>Explore Event</span>
          <span className={classes.icon}><ArrowRightIcon/></span>
        </Button>
      </div>
    </li>
  )
}

export default EventItem;