import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Link,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
  senderName: string;
};

export const ContactFormEmail = ({
  message,
  senderEmail,
  senderName,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from {senderName} via your portfolio</Preview>
      <Tailwind>
        <Body className="bg-gray-50">
          <Container>
            <Section className="my-10 rounded-lg border border-gray-200 bg-white px-10 py-8 shadow-lg">
              {/* Logo Header */}
              <div className="mb-8 text-center">
                <Img
                  src="https://res.cloudinary.com/dy55vopm2/image/upload/v1731506627/Group_22_bilwww.png"
                  width="40"
                  height="40"
                  alt="Logo"
                  className="mx-auto"
                />
              </div>

              {/* Title */}
              <Heading className="mb-6 text-center text-2xl font-bold text-gray-900">
                New Portfolio Message
              </Heading>

              {/* Sender Info Box */}
              <div className="mb-6 rounded-md bg-gray-50 p-4">
                <Text className="m-0 text-base font-semibold text-gray-900">
                  From: {senderName}
                </Text>
                <Link
                  href={`mailto:${senderEmail}`}
                  className="text-base text-emerald-600 underline"
                >
                  {senderEmail}
                </Link>
              </div>

              {/* Message Section */}
              <div className="rounded-md border border-gray-200 bg-white p-6">
                <Text className="mb-2 text-base font-medium text-gray-900">
                  Message:
                </Text>
                <Text className="text-base whitespace-pre-wrap text-gray-600">
                  {message}
                </Text>
              </div>

              <Hr className="my-6 border-gray-200" />

              {/* Footer */}
              <Text className="text-center text-sm text-gray-400">
                This email was sent from your contact form on{" "}
                <Link
                  href="https://nabeelhassan.dev"
                  className="text-emerald-600 underline"
                >
                  nabeelhassan.dev
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
