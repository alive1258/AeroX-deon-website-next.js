import EditVideoShowcase from "@/src/components/Ui/Dashboard/VideoShowcase/EditVideoShowcase";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditVideoShowcase id={id} />
    </div>
  );
};

export default Page;
