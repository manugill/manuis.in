import React from 'react'
import styled from 'styled-components';

const Wrap = styled.header`
	padding: calc(360px + 50px) 0 60px;
	text-align: center;
`
const Name = styled.div`
	color: black;
	font-family: Poppins, Helvetica, Sans-Serif;
	font-size: 64px;
	line-height: 1.33;
	font-weight: 200;
	position: relative;
	display: inline-block;
	color: rgba(150, 48, 48, 1);
	transform:
`
const Domain = styled.div`
	position: absolute;
	bottom: -1px;
	right: -2px;
	font-size: 16px;
	font-weight: 500;
	line-height: 1;
	color: blue;
`

const Header = () => <Wrap>
	<Name>
		मनु सिंह गिल{` `}
		<Domain title="you're already here duh.">manuis.in</Domain>
		</Name>
</Wrap>

export default Header