import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/reactnativereusables/ui/alert-dialog';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button } from '../ui/reactnativereusables/ui/button';

type ErrorAlertProps = {
  error: Error | null;
};

function ErrorAlert({ error }:  ErrorAlertProps ) {
  const [open, setOpen] = useState(false);

  // Open the dialog when breakingError becomes true
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className='hidden'>
        <Button variant='default'>
          <Text>Alert</Text>
        </Button>
      </AlertDialogTrigger>


      <AlertDialogContent style={{
    backgroundColor: '#F8F8FF', // Or your surface color
    minWidth: '80%',
    zIndex: 100, // Ensure it's above the overlay
    elevation: 10, // for Android
  }}>
        <AlertDialogHeader>
          <AlertDialogTitle>Alert</AlertDialogTitle>
          <AlertDialogDescription>
            {error?.message
              ? error.message
              : 'Something want wrong when fetching data'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-blue-500 border-none outline-none'>
            <Text className='text-white text-lg'>Close</Text>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ErrorAlert;
