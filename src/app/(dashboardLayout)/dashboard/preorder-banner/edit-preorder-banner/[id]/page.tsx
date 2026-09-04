import EditPreorderBanner from "@/src/components/Ui/Dashboard/PreorderBanner/EditPreorderBanner";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditPreorderBanner id={id} />
    </div>
  );
};

export default Page;
