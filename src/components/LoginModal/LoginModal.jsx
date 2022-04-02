import AuthPage from '../../pages/AuthPage/AuthPage'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'

export default function LoginModal({user, setUser, boardSpot, setBoardSpot, isOpen, onOpen, onClose, cancelRef}) {
    
    return(  
<AlertDialog
isOpen={isOpen}
leastDestructiveRef={cancelRef}
onClose={onClose}
>
<AlertDialogOverlay>
  <AlertDialogContent>
    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
      Login
    </AlertDialogHeader>

    <AlertDialogBody>
        <AuthPage 
        user={user}
        setUser={setUser}
        boardSpot={boardSpot}
        setBoardSpot={setBoardSpot}
        onClose={onClose}
        /> 
    </AlertDialogBody>

    <AlertDialogFooter>
    <button onClick={onClose}>X</button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogOverlay>
</AlertDialog>
    )

}




