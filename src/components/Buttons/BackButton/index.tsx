'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../../ui/button';


const BackButton = () => {
  const router = useRouter()

  return (
    <Button 
      variant="outline"
      size="sm"
      className="h-8"
      onClick={() => router.back()}
    >
      뒤로
    </Button>
  );

 
};

export default BackButton;
