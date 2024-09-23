import UsersList from "@/services/helpers/userList";
import EventsList from "@/services/helpers/eventList";
import CategoriesList from "@/services/helpers/categoryList";

export default function TestApi() {
    return (
        <>
            <div>
            <h1>TestApi Users</h1>
            <UsersList />
        </div>
        <div>
            <h2>Test Events</h2>
            <EventsList />
        </div>
        <div>
            <h2>Test Categories</h2>
            <CategoriesList />
        </div>
        </>
    )
}