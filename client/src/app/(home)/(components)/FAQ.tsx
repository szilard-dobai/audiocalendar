import Card from "@/components/Card";
import Link from "next/link";
import CollapsibleDefinition from "./CollapsibleDefinition";

const FAQ = () => (
  <Card
    id="faq"
    title="FAQ"
    description=" Explore Commonly Asked Questions"
    content={
      <dl className="flex flex-col gap-4">
        <CollapsibleDefinition
          term="How does Audiocalendar work?"
          description="Audiocalendar connects to your Spotify and Google accounts. Whenever you
        listen to a song on Spotify, it automatically creates an event in your
        Google Calendar."
        />

        <CollapsibleDefinition
          term="Is my data safe?"
          description={
            <>
              We take your privacy seriously. Audiocalendar only accesses the
              necessary information to create calendar events. Your data is
              secure and never shared with third parties.
              <br />
              Audiocalendar&apos;s use and transfer of information received from
              Google APIs to any other app will adhere to{" "}
              <Link
                href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
                target="_blank"
                className="font-semibold hover:underline"
              >
                Google API Services User Data Policy
              </Link>
              , including the Limited Use requirements.
            </>
          }
        />

        <CollapsibleDefinition
          term="Can I customize my calendar events?"
          description="Absolutely! You have full control over event titles, descriptions, and
        calendar settings. Make it personal and meaningful."
        />

        <CollapsibleDefinition
          term="Is Audiocalendar free to use?"
          description="Yes, it's completely free to use!"
          // description="Yes, we offer a free plan with essential features. For advanced
          // functionality and additional customization options, we offer a premium
          // subscription."
        />

        <CollapsibleDefinition
          term="Can I unlink my accounts?"
          description="Yes, you can unlink your Spotify and Google accounts at any time within
        the Audiocalendar settings."
        />
      </dl>
    }
  />
);

export default FAQ;
