import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 1200px;
    min-height: 100vh;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px 40px 10px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const Layout: React.FC = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
};

export default Layout;
