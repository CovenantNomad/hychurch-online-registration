import EmptyState from "@/components/EmptyState/EmptyState";
import ProfileCard from "@/components/ProfileCard";
// api
import { getUserById } from "@/lib/firebase";


const User = async ({ params }: { params: { id: string } }) => {
  const data = await getUserById(params.id)

  return (
    <>
      {data ? (
        <ProfileCard data={data} />
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default User;
