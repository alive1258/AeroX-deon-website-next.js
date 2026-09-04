import EditPerformance from "@/src/components/Ui/Dashboard/Performance/EditPerformance";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditPerformance id={id} />
    </div>
  );
};

export default Page;
