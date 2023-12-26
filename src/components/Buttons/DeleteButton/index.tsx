'use client'

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteRegistration } from "@/lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const DeleteButton = ({ userId, name }: { userId: string, name: string }) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getRegistrations'] })
    }
  })
  
  const onDeleteHandler = async () => {
    await mutation.mutateAsync(userId)

    toast({
      title: "온라인 등록정보 삭제",
      description: `${name}의 온라인 등록정보를 삭제하였습니다.`,
    })
    router.back()
  }
  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden h-8 bg-red-600 hover:bg-red-700 text-white hover:text-white lg:flex"
      onClick={onDeleteHandler}
    >
      삭제
    </Button>
  );
};

export default DeleteButton;
