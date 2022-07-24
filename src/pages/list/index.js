import React from 'react';
import {
    Divider,
    Flex,
    Box,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Image,
    Stack
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

function List() {

    const navigate = useNavigate();

    return (
        <>
            <Stack spacing={6}>
                <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' borderColor='#E2E8F0' width='100%' textAlign='left'>
                    <Flex justifyContent='space-between' alignItems='center'>
                        <Box w='100%'>
                            <Flex justifyContent='space-between' alignItems='center' w='100%'>
                                <Image
                                    borderRadius='lg'
                                    boxSize='100px'
                                    src='https://www.syracuse.com/resizer/0X7L9GNUtqQj6TppSRkDIjK6mEc=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/NPKVVKP6PBEWRISW7FTSWEK2QM.jpg'
                                />
                                <Flex flexDirection='column' w='100%' paddingX='20px'>
                                    <Box>
                                        <Flex justifyContent='space-between'>
                                            <div style={{
                                                fontSize: 20,
                                                fontWeight: 700
                                            }}>Foo Fighters</div>
                                            <div>Price: RM 9999.99</div>
                                        </Flex>
                                    </Box>
                                    <Divider marginY='5px' />
                                    <div>Date: 1 Feb 2022 - 30 Dec 2022</div>
                                    <div>Features: Dave Grohl, Taylor Hawkins, etc. </div>
                                </Flex>
                            </Flex>
                        </Box>

                        <Flex flexDirection='column' justifyContent='space-between' alignItems='center' maxWidth={150}>
                            <Box marginBottom='10px'>
                                <NumberInput defaultValue={0} min={0} max={500}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                            <Button colorScheme='gray' variant='ghost' width='100%'>
                                Add to Cart
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </Stack>
            <Flex justifyContent='right'>
                <Box marginY={10}>
                    <Button
                        colorScheme='gray'
                        variant='outline'
                        size='lg'
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </Button>
                </Box>
            </Flex>
        </>
    );
}

export default List;
