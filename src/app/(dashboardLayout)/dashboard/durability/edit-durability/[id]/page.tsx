import EditDurability from "@/src/components/Ui/Dashboard/Durability/EditDurability";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditDurability id={id} />
    </div>
  );
};

export default Page;
