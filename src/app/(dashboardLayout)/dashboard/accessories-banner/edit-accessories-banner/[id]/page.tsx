import EditAccessoriesBanner from "@/src/components/Ui/Dashboard/AccessoriesBanner/EditAccessoriesBanner";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditAccessoriesBanner id={id} />
    </div>
  );
};

export default Page;
