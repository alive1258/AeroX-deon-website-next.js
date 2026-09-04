import EditGimbalBanner from "@/src/components/Ui/Dashboard/GimbalBanner/EditGimbalBanner";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditGimbalBanner id={id} />
    </div>
  );
};

export default Page;
