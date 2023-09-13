import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function HandleError() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/stations')
  }, [router]);

  return null;
}

export default HandleError;
