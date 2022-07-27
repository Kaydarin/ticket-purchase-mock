import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTicketQuantity, resetQuantity } from '../../store/ticket';
import { addToCart } from '../../store/order';
import {
    Divider,
    Flex,
    Box,
    Tooltip,
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
    const dispatch = useDispatch();
    const dispatcher = useCallback(cb => dispatch(cb), [dispatch])

    const { list } = useSelector(state => state.ticket);
    const { cart } = useSelector(state => state.order);

    const checkout = () => {
        dispatcher(resetQuantity())
        navigate("/checkout");
    }

    return (
        <>
            <Stack spacing={6}>
                {list && list.map((ticket, index) => (
                    <Box key={index} borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' borderColor='#E2E8F0' width='100%' textAlign='left'>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <Box w='100%'>
                                <Flex justifyContent='space-between' alignItems='center' w='100%'>
                                    <Image
                                        borderRadius='lg'
                                        boxSize='100px'
                                        src={ticket.img}
                                    />
                                    <Flex flexDirection='column' w='100%' paddingX='20px'>
                                        <Box>
                                            <Flex justifyContent='space-between'>
                                                <div style={{
                                                    fontSize: 20,
                                                    fontWeight: 700
                                                }}>{ticket.title}</div>
                                                <div>Price: {ticket.currency === 'MYR' ? 'RM' : '$'} {ticket.price.toFixed(2)}</div>
                                            </Flex>
                                        </Box>
                                        <Divider marginY='5px' />
                                        <div>Date: {ticket.startDate} - {ticket.endDate}</div>
                                        <div>Venue: {ticket.venue}</div>
                                    </Flex>
                                </Flex>
                            </Box>

                            <Flex flexDirection='column' justifyContent='space-between' alignItems='center' maxWidth={150}>
                                <Box marginBottom='10px'>
                                    <NumberInput
                                        defaultValue={ticket.quantity}
                                        value={ticket.quantity}
                                        min={0}
                                        max={500}
                                        onChange={(val) => dispatcher(setTicketQuantity({
                                            id: ticket.id,
                                            value: parseInt(val)
                                        }))}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Box>
                                <Tooltip label='Increase quantity to add this ticket into cart!' isDisabled={ticket.quantity > 0}>
                                    <div>
                                        <Button
                                            colorScheme='gray'
                                            variant='ghost'
                                            width='100%'
                                            disabled={ticket.quantity <= 0}
                                            onClick={() => dispatcher(addToCart(index))}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </Stack>
            <Flex justifyContent='right'>
                <Box marginY={10}>
                    <Button
                        colorScheme='gray'
                        variant='outline'
                        size='lg'
                        disabled={cart && cart.length <= 0}
                        onClick={() => checkout()}
                    >
                        Checkout
                    </Button>
                </Box>
            </Flex>
        </>
    );
}

export default List;
