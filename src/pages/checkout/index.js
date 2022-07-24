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
    Stack,
    FormControl,
    FormLabel,
    Select,
    Input
} from '@chakra-ui/react';

function Checkout() {

    return (
        <Flex justifyContent='space-between' textAlign='left' gap='5'>
            <Box w='60%'>
                <Stack spacing={6}>
                    <Box>
                        <div style={{
                            fontSize: 28,
                            fontWeight: 700
                        }}>Tickets</div>
                        <Divider margin='5px 0 20px 0' />
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
                                            Remove
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <div style={{
                            fontSize: 28,
                            fontWeight: 700
                        }}>Payment</div>
                        <Divider margin='5px 0 20px 0' />
                        <Stack spacing={6}>
                            <Box>
                                <div style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    marginBottom: 10
                                }}>Payment Method</div>
                                <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' borderColor='#E2E8F0' width='100%' textAlign='left'>
                                    <Stack spacing={3}>
                                        <FormControl>
                                            <FormLabel>Methods</FormLabel>
                                            <Select placeholder='Select payment method'>
                                                <option value='visa'>Visa</option>
                                                <option value='mastercard'>MasterCard</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Card Number</FormLabel>
                                            <Input placeholder='Enter card number' />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Card Expiry</FormLabel>
                                            <Flex gap={5}>
                                                <NumberInput min={1} max={12} w='100%'>
                                                    <NumberInputField placeholder='Month' />
                                                </NumberInput>
                                                <NumberInput min={2000} max={3000} w='100%'>
                                                    <NumberInputField placeholder='Year' />
                                                </NumberInput>
                                            </Flex>
                                        </FormControl>
                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Box w='40%'>
                <div style={{
                    fontSize: 28,
                    fontWeight: 700
                }}>Summary</div>
                <Divider margin='5px 0 20px 0' />
                <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' borderColor='#E2E8F0' width='100%' textAlign='left'>
                    <div style={{
                        fontSize: 20,
                        fontWeight: 700,
                        marginBottom: 10
                    }}>Tickets</div>
                    <Stack spacing={1} marginBottom='30px'>
                        <Flex justifyContent='space-between'>
                            <div>Foo Fighters (x2)</div>
                            <div>RM 99.99</div>
                        </Flex>
                        <Flex justifyContent='space-between'>
                            <div>Foo Fighters (x2)</div>
                            <div>RM 99.99</div>
                        </Flex>
                    </Stack>
                    <Flex justifyContent='space-between'>
                        <div>Tax</div>
                        <div>RM 99.99</div>
                    </Flex>
                    <Flex justifyContent='space-between'>
                        <div>Total</div>
                        <div style={{
                            fontWeight: 700
                        }}>RM 99999.99</div>
                    </Flex>
                    <Divider />
                    <Flex justifyContent='right'>
                        <Box marginTop='20px'>
                            <Button
                                colorScheme='gray'
                                variant='outline'
                                size='lg'
                            >
                                Pay
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default Checkout;
