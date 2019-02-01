import React , {Component} from 'react';
import Head from 'next/head';
import Header from './Header';
import Wrap from './Wrap';
import Footer from './Footer'




export default props => {
  
  return (
    <Wrap>
        <Head>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
         </Head>
        <div>
          <Header />
          
            {props.children}
            
        </div>
        
        </Wrap>
  );
};

