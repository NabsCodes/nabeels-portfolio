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
  date?: string;
};

export const ContactFormEmail = ({
  message,
  senderEmail,
  senderName = "",
  date = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                "bg-dark": "#0e1714",
                "bg-card": "#1a2420",
                primary: "#5d8e81",
                "primary-muted": "#9cbcb2",
                accent: "#3f7d6e",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>New message from {senderName} via your portfolio</Preview>
        <Body className="bg-bg-dark m-0 p-[48px_0px]">
          <Container className="bg-bg-card mx-auto w-full max-w-[465px] rounded-lg px-4">
            <Section className="bg-bg-dark my-[16px] rounded-[8px] p-[32px_24px] shadow-lg">
              {/* Logo Header */}
              <div className="mb-[32px] text-center">
                <Img
                  src="https://res.cloudinary.com/dy55vopm2/image/upload/v1743001924/nabeelhassan-logo_y0zjon.png"
                  width="80"
                  height="80"
                  alt="Nabeel Hassan Logo"
                  className="mx-auto"
                />
              </div>

              {/* Title */}
              <Heading className="text-primary m-0 mb-[24px] text-center text-[24px] leading-tight font-bold">
                New Portfolio Message
              </Heading>

              {/* Notification Badge */}
              <div className="mb-[24px] flex items-center justify-center">
                <div className="bg-primary/15 inline-block rounded-[20px] px-[16px] py-[8px]">
                  <Text className="text-primary-muted m-0 flex items-center gap-[6px] text-center text-[14px] font-medium">
                    Received on {date}
                  </Text>
                </div>
              </div>

              {/* Sender Info Section */}
              <div className="mb-[24px] overflow-hidden rounded-[8px] bg-gray-800 shadow-md">
                {/* Header */}
                <div className="bg-primary/15 px-[20px] py-[12px]">
                  <Text className="text-primary-muted m-0 text-[16px] font-semibold tracking-wide">
                    Sender Information
                  </Text>
                </div>

                {/* Content */}
                <div className="p-[20px]">
                  {/* Name Row */}
                  <div className="mb-[16px] flex items-start gap-3">
                    <Text className="text-primary-muted m-0 min-w-[60px] text-[14px]">
                      Name:
                    </Text>
                    <Text className="text-primary m-0 flex-1 text-[15px] font-medium">
                      {senderName}
                    </Text>
                  </div>

                  {/* Email Row */}
                  <div className="flex items-start gap-3">
                    <Text className="text-primary-muted m-0 min-w-[60px] text-[14px]">
                      Email:
                    </Text>
                    <Text className="m-0 flex-1 text-[15px] break-all text-gray-400">
                      {senderEmail}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="overflow-hidden rounded-[8px] bg-gray-800 shadow-md">
                <div className="bg-primary/15 px-[20px] py-[12px]">
                  <Text className="text-primary-muted m-0 text-[16px] font-semibold tracking-wide">
                    Message Content
                  </Text>
                </div>

                <div className="p-[20px]">
                  <Text className="m-0 text-[16px] leading-relaxed whitespace-pre-wrap text-gray-300">
                    {message}
                  </Text>
                </div>
              </div>

              <Hr className="my-[24px] text-gray-600" />

              {/* Footer */}
              <div className="text-center">
                <Text className="m-0 text-[14px] text-gray-400">
                  This email was sent from your contact form on{" "}
                  <Link
                    href="https://nabeelhassan.dev"
                    className="text-primary underline"
                  >
                    nabeelhassan.dev
                  </Link>
                </Text>

                <Text className="mt-[16px] mb-0 text-[12px] text-gray-500">
                  © {new Date().getFullYear()} Nabeel Hassan. All rights
                  reserved.
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
