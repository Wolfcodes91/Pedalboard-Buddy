import AuthPage from '../../pages/AuthPage/AuthPage'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'

export default function LoginModal(user, setUser, boardSpot, setBoardSpot) {
    return(
<AlertDialog
isOpen={false}
leastDestructiveRef={'Ref'}
onClose={() => console.log('hi')}
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
        /> 
    </AlertDialogBody>

    <AlertDialogFooter>
      {/* <Button ref={cancelRef} onClick={onClose}>
        Cancel
      </Button>
      <Button colorScheme='red' onClick={onClose} ml={3}>
        Delete
      </Button> */}
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogOverlay>
</AlertDialog>
    )

}





