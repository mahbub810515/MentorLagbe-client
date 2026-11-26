interface TuitionDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const TuitionDetailsPage = async ({
  params,
}: TuitionDetailsPageProps) => {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">
        Tuition Details
      </h1>

      <p className="mt-4 text-gray-600">
        Tuition ID: {id}
      </p>
    </div>
  );
};

export default TuitionDetailsPage;