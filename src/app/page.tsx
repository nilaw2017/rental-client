import Map from "../Map";
import { Sidebar } from "../components/sidebar";
import { SearchBar } from "../components/SearchBar";
import { UserProfile } from "../components/UserProfile";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 relative">
        <SearchBar />
        <UserProfile />
        <Map />
      </div>
    </div>
  );
}
