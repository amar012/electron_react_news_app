import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';

export const Article =  ({data}) => {
    return (
      <Card>
	<CardHeader>{data.title}</CardHeader>
	<CardBody>{data.desc}</CardBody>
      </Card>
    );
}