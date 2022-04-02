export default function BoardSaved({toast}) {
    
    return (
            toast({
            title: 'Pedalboard created.',
            description: "We've created your Pedalboard for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            })
    )
}