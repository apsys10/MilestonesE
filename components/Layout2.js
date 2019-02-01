import React from 'react';
import Head from 'next/head';
import Wrap from './Wrap'

// for login page only

export default props => {
  return (
    <Wrap>
        <Head>
            <link
                rel="stylesheet"
                href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"
            />
       </Head>
        <div>
         
          {props.children}
          
        </div>
    </Wrap>
   );
};

