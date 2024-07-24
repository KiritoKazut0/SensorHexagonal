import Event from "./Event";
import EventRequest from "./DTOS/EventRequest";

export default interface EventRepository {
    activeLeds(event: EventRequest): Promise<Event | null>;
}