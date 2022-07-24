import React from 'react';
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

    return (
        <BrowserRouter>
            <Container maxW='80%' paddingY='20px'>
                <Flex alignItems='center'>
                    <Heading size='sm' >Ticket Purchase Mock</Heading>
                    <Spacer />
                    <Box>
                        <Flex alignItems='center'>
                            <Box marginX='20px'>Hi John Doe!</Box>
                            <Box borderWidth='1px' borderRadius='xl' overflow='hidden' p='2' borderColor='#E2E8F0'>
                                <Flex minWidth={100} alignItems='center' justifyContent='space-around'>
                                    <NavLink to="checkout">
                                        <IconButton
                                            aria-label='cart'
                                            icon={<FaShoppingCart />}
                                            colorScheme='gray'
                                            variant='ghost'
                                        />
                                    </NavLink>
                                    <div>
                                        <Tag variant='outline' colorScheme='teal'>
                                            999
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
