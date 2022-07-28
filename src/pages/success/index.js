import React from 'react';
import {
    Flex,
    Box,
    Stack,
    Icon
} from '@chakra-ui/react';
import { FaRegCheckCircle } from "react-icons/fa";

function Success() {
    return (
        <Flex justifyContent='center'>
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' borderColor='#E2E8F0' width='50%'>
                <Stack spacing={4} alignItems='center'>
                    <div style={{
                        fontSize: 28,
                        fontWeight: 700
                    }}>Payment Success!</div>
                    <Icon as={FaRegCheckCircle} boxSize={40} color='teal' />
                    <div style={{ textAlign: 'center' }}>
                        We will send the tickets to your email along with the receipt.
                    </div>
                </Stack>
            </Box>
        </Flex>
    );
}

export default Success;
