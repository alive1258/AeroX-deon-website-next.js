import EditFlightMode from "@/src/components/Ui/Dashboard/FlightModes/EditFlightMode";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditFlightMode id={id} />
    </div>
  );
};

export default Page;
