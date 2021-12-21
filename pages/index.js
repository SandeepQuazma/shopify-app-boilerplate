import React from 'react';
import { Heading, Page, TextStyle, Layout, EmptyState, TopBar} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Framelayout from '../components/Framelayout'
import { PrismaClient } from '@prisma/client'


const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
// const prisma = new PrismaClient();

// Sets the state for the resource picker
class Index extends React.Component {


  state = { open: false };
  render() {
    return (
      <Page>
     <Framelayout/>
        
       
        <Layout>
          <EmptyState
            heading="Discount your products temporarily"
            action={{
              content: 'Select products',
              onAction: () => this.setState({ open: true }),
            }}
            image={img}
          >
            <p>Select products to change their price temporarily.</p>
          </EmptyState>
        </Layout>
      </Page>
    );
  }
  handleSelection = (resources) => {
    this.setState({ open: false });
    console.log(resources);
  };
}

export default Index;
