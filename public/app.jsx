import React from "react";
import { Helmet, HelmetProvider } from "helmet";

import MouseUnderlay from './MouseUnderlay.jsx'
import Header from './Header.jsx'

const Ultra = ({ helmetContext }) => {
  return (
    <>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <meta charset="UTF-8" />

          <link rel="shortcut icon" href="/favicon.png"/>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Kadwa:wght@400;700&family=Kalam:wght@300;400;700&family=Khula:wght@300;400;600;700;800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Tillana:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

          <link rel="stylesheet" href="/style.css" />

          <title>मनु सिंह गिल</title>
        </Helmet>

        <Header />
        <main style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: '0 30px',
        }}>
        <p><i>नमस्कार!</i> यह मेरी निजी वेबसाइट है और यह मुख्य रूप से हिंदी में उपलब्ध है। मेरी रुचि कोडिंग और संगीत में है। मैं कभी-कभी अपने अनुभव यहां प्रकाशित करता हूं या अपनी पसंद की चीजों के बारे में लिखता हूं।</p>
        </main>

      </HelmetProvider>
      <MouseUnderlay />
    </>
  );
};

export default Ultra;
