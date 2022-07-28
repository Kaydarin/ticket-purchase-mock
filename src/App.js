import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import {
    Heading,
    Container,
    Divider,
    Flex,
    Box,
    Spacer,
    IconButton,
    Tag
} from '@chakra-ui/react';
import { FaShoppingCart } from "react-icons/fa";
import List from './pages/list';
import Checkout from './pages/checkout';
import Success from './pages/success';

function App() {

    const { username } = useSelector(state => state.app);
    const { cart, totalCart } = useSelector(state => {

        const cart = state.order.cart;

        const totalCart = cart.reduce((accummulate, obj) => {
            return accummulate + obj.quantity;
        }, 0);

        return {
            cart,
            totalCart
        }
    });

    const goToCart = (e) => {
        if (cart.length <= 0) {
            e.preventDefault()
        }
    }

    return (
        <BrowserRouter>
            <Container maxW='80%' paddingY='20px'>
                <Flex alignItems='center'>
                    <NavLink
                        to="/"
                    >
                        <Heading size='sm' >Ticket Purchase Mock</Heading>
                    </NavLink>
                    <Spacer />
                    <Box>
                        <Flex alignItems='center'>
                            <Box marginX='20px'>Hi {username}!</Box>
                            <Box borderWidth='1px' borderRadius='xl' overflow='hidden' p='2' borderColor='#E2E8F0'>
                                <Flex minWidth={100} alignItems='center' justifyContent='space-around'>
                                    <NavLink
                                        to="checkout"
                                        onClick={goToCart}
                                    >
                                        <IconButton
                                            aria-label='cart'
                                            icon={<FaShoppingCart />}
                                            colorScheme='gray'
                                            variant='ghost'
                                            disabled={cart.length <= 0}
                                        />
                                    </NavLink>
                                    <div>
                                        <Tag variant='outline' colorScheme='teal'>
                                            {totalCart}
                                        </Tag>
                                    </div>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </Container>
            <Divider />
            <Container maxW='80%' paddingY='20px'>
                <Routes>
                    <Route path="/" element={<Navigate to='/tickets' />} />
                    <Route path="/tickets" element={<List />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
