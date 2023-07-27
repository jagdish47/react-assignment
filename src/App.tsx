import Table from "./components/table/Table";

function App() {
  return (
    <div className="h-screen bg-[#DDD4D7]">
      <header>
        <h1 className="text-black text-center text-4xl font-bold pt-10">Admin Dashboard</h1>
      </header>
      <main>
        <div className="mx-10 my-10 w-[80%] md:mx-auto md:my-20 md:w-[1000px]">
          <Table />
        </div>
      </main>
    </div>
  );
}

export default App;
