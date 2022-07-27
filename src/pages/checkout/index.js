import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setTicketOrderQuantity, removeTicketOrder, submitOrder, resetOrder } from '../../store/order';
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
    Input,
    useToast,
} from '@chakra-ui/react';

function Checkout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dispatcher = useCallback(cb => dispatch(cb), [dispatch])
    const toast = useToast();
    const formRef = useRef();

    const { cart, paymentMethod, totalTaxRate, total } = useSelector(state => {

        const cart = state.order.cart;
        const paymentMethod = state.order.paymentMethod;
        const taxRate = state.order.taxRate;

        const totalTaxRate = cart.reduce((accummulate, obj) => {
            return accummulate + (taxRate * obj.quantity)
        }, 0);
        const total = cart.reduce((accummulate, obj) => {
            return accummulate + (obj.price * obj.quantity)
        }, 0) + totalTaxRate;

        return {
            paymentMethod,
            cart,
            totalTaxRate,
            total
        }
    });

    const pay = async () => {

        let paymentMethod;
        let cardNo;
        let cardExpiry;
        let cardCCV;

        for (let i = 0; i < formRef.current.length; i++) {

            const fieldName = formRef.current[i].name;
            const fieldValue = formRef.current[i].value;

            switch (fieldName) {
                case 'payment_method':
                    paymentMethod = fieldValue;
                    break;
                case 'card_no':
                    cardNo = fieldValue;
                    break;
                case 'card_expiry':
                    cardExpiry = fieldValue;
                    break;
                case 'card_ccv':
                    cardCCV = fieldValue;
                    break;
                default:
                    break;
            }
        }

        console.log(paymentMethod === '')

        if (
            paymentMethod === '' ||
            cardNo === '' ||
            cardExpiry === '' ||
            cardCCV === ''
        ) {
            toast({
                title: `Opps! You haven't filled up payment info!`,
                status: 'error',
                isClosable: true,
            });
        } else {

            const res = await dispatcher(submitOrder({
                paymentMethod,
                cardNo,
                cardExpiry,
                cardCCV,
            }))

            if (res.meta.requestStatus === 'fulfilled') {
                dispatcher(resetOrder())
                navigate("/success", { replace: true })
            } else {
                toast({
                    title: 'Opps! Something Wrong!',
                    status: 'error',
                    isClosable: true,
                });
            }
        }

    }

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
                            {
                                cart && cart.length <= 0 ? (
                                    <div>You have nothing in cart.</div>
                                ) : cart.map((ticket, index) => (
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
                                                        onChange={(val) => dispatcher(setTicketOrderQuantity({
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
                                                <Button
                                                    colorScheme='gray'
                                                    variant='ghost'
                                                    width='100%'
                                                    onClick={() => dispatcher(removeTicketOrder(index))}
                                                >
                                                    Remove
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                ))}
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
                                    <form ref={formRef}>
                                        <Stack spacing={3}>
                                            <FormControl>
                                                <FormLabel>Methods</FormLabel>
                                                <Select placeholder='Select payment method' name='payment_method'>
                                                    {
                                                        paymentMethod && paymentMethod.map((payment, index) => (
                                                            <option key={index} value={payment.id}>{payment.name}</option>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Card Number</FormLabel>
                                                <Input placeholder='Enter card number' name='card_no' />
                                            </FormControl>
                                            <Flex gap={5}>
                                                <FormControl>
                                                    <FormLabel>Card Expiry</FormLabel>
                                                    <Input placeholder='Ex; 01/2022' name='card_expiry' />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Card CCV</FormLabel>
                                                    <Input placeholder='Enter card CCV' name='card_ccv' />
                                                </FormControl>
                                            </Flex>
                                        </Stack>
                                    </form>
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
                        {
                            cart && cart.map((ticket, index) => {
                                if (ticket.quantity > 0) {
                                    return (
                                        <Flex key={index} justifyContent='space-between'>
                                            <div>{ticket.title} (x{ticket.quantity})</div>
                                            <div>{ticket.currency === 'MYR' ? 'RM' : '$'} {(ticket.price * ticket.quantity).toFixed(2)}</div>
                                        </Flex>
                                    )
                                } else {
                                    return <></>
                                }
                            })
                        }
                    </Stack>
                    <Flex justifyContent='space-between'>
                        <div>Tax</div>
                        <div>RM {totalTaxRate.toFixed(2)}</div>
                    </Flex>
                    <Flex justifyContent='space-between'>
                        <div>Total</div>
                        <div style={{
                            fontWeight: 700
                        }}>RM {total.toFixed(2)}</div>
                    </Flex>
                    <Divider />
                    <Flex justifyContent='right'>
                        <Box marginTop='20px'>
                            {
                                cart && cart.length <= 0 ? (
                                    <Button
                                        colorScheme='gray'
                                        variant='outline'
                                        size='lg'
                                        onClick={() => navigate(-1)}
                                    >
                                        Go Back
                                    </Button>
                                ) : (
                                    <Button
                                        colorScheme='gray'
                                        variant='outline'
                                        size='lg'
                                        onClick={() => pay()}
                                    >
                                        Pay
                                    </Button>
                                )
                            }
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default Checkout;
