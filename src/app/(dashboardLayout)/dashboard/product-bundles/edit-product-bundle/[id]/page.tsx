import EditProductBundle from "@/src/components/Ui/Dashboard/ProductBundles/EditProductBundle";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditProductBundle id={id} />
    </div>
  );
};

export default Page;
