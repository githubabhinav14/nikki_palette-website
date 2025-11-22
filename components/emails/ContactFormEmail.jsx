import * as React from 'react';
import {
  Html,
  Body,
  Container,
  Head,
  Hr,
  Heading,
  Link,
  Preview,
  Text,
} from '@react-email/components';

export const ContactFormEmail = ({
  senderName,
  senderEmail,
  senderPhone,
  message,
}) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {senderName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            New Art Commission Inquiry
          </Heading>
          
          <Hr style={hr} />
          
          <Text style={text}>
            <strong>Name:</strong> {senderName}
          </Text>
          <Text style={text}>
            <strong>Email:</strong>{' '}
            <Link href={`mailto:${senderEmail}`} style={link}>
              {senderEmail}
            </Link>
          </Text>
          {senderPhone && (
            <Text style={text}>
              <strong>Phone:</strong> {senderPhone}
            </Text>
          )}
          
          <Hr style={hr} />
          
          <Heading as="h3" style={subheading}>Message</Heading>
          <Text style={messageText}>{message}</Text>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            This message was sent from your art portfolio contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#faf8f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const heading = {
  color: '#713f12',
  fontSize: '28px',
  fontWeight: '700',
  margin: '16px 0',
};

const subheading = {
  color: '#854d0e',
  fontSize: '20px',
  fontWeight: '600',
  margin: '12px 0',
};

const text = {
  color: '#645c48',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '12px 0',
};

const messageText = {
  color: '#645c48',
  fontSize: '16px',
  lineHeight: '24px',
  backgroundColor: '#fdfcfb',
  padding: '16px 20px',
  borderRadius: '8px',
  border: '2px solid #ebe3d5',
  whiteSpace: 'pre-wrap',
};

const hr = {
  borderColor: '#ddd0b8',
  margin: '20px 0',
};

const link = {
  color: '#d4a017',
  textDecoration: 'underline',
};

const footer = {
  color: '#9a8a6f',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '20px 0 0',
};
