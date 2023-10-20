import { Header } from "./components";
import { Sidemenu } from "./components";
import Dashboard from "./dashboard/page";

export const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Sidemenu />
      <Dashboard />
    </main>
  )
}

export default Home;