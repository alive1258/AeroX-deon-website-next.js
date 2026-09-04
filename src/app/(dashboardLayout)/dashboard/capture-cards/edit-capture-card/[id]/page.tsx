import EditCaptureCard from "@/src/components/Ui/Dashboard/CaptureCards/EditCaptureCard";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditCaptureCard id={id} />
    </div>
  );
};

export default Page;
