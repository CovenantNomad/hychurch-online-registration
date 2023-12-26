import { Skeleton } from "@/components/ui/skeleton";

const UserProfileLoading = () => {
  return (
    <div>
      <Skeleton className="h-12 w-44 leading-7" />
      <div className="hidden lg:flex lg:justify-end lg:pt-4 lg:pb-1">
        <Skeleton className="h-12 w-20" />
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:py-4 lg:px-2 lg:grid-cols-3">
        <Skeleton className="h-[400px] w-[300px] rounded-md" />
        <Skeleton className="h-[400px] w-full rounded-md lg:col-span-2" />
      </div>
    </div>
  );
};

export default UserProfileLoading;
