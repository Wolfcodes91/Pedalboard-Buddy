import AuthPage from '../../pages/AuthPage/AuthPage'
import "./LoginModal.css"
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
    <div className="cancelLogin">
    <button className="cancelButton" onClick={onClose}>Cancel</button>
    </div>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogOverlay>
</AlertDialog>
    )

}





