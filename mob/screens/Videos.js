import { Container, List, Text } from 'native-base';
import React from 'react';
import { Card } from '../components/Card';
import { ScrollView } from 'react-native-gesture-handler';

const Videos = () => {
  const data = [
    { id: 1, heading: 'Item 1', subheading: 'Item 1', description: 'description' },
    { id: 2, heading: 'Item 2', subheading: 'Item 2', description: 'description' },
    { id: 3, heading: 'Item 3', subheading: 'Item 3', description: 'description' },
    { id: 4, heading: 'Item 3', subheading: 'Item 3', description: 'description' },
    { id: 5, heading: 'Item 3', subheading: 'Item 3', description: 'description' },
    { id: 6, heading: 'Item 3', subheading: 'Item 3', description: 'description' },
  ];

  return (
    <ScrollView>
        <List>
          <Card heading="+ Novo Vídeo"/>
          {data.map(item => (
              <Card key={item.id} heading={item.heading} subheading={item.subheading} description={item.description}/>
          ))}
        </List>
    </ScrollView>
  );
};

export default Videos;
