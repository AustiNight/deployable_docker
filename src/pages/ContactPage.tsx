import { ContactSection } from "@/components/sections/contact-section";
import { useContentStore } from "@/state/content-store";

export const ContactPage = () => {
  const contact = useContentStore((state) => state.content.contact);

  return <ContactSection section={contact} />;
};
