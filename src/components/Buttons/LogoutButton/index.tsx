'use client'

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";



type LogoutButtonProps = {}

const LogoutButton = ({}: LogoutButtonProps) => {
  
  return (
    <Button 
      variant="outline"
      size="sm"
      className="h-8"
      onClick={() => signOut()}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
