import CollapsibleDefinition from "./CollapsibleDefinition";

const FAQ = () => (
  <section id="faq" className="my-20 md:my-36 bg-brand-50 p-8 rounded-lg">
    <dl className="flex flex-col gap-4">
      <CollapsibleDefinition
        term="How does Audiocalendar work?"
        description="Audiocalendar connects to your Spotify and Google accounts. Whenever you
        listen to a song on Spotify, it automatically creates an event in your
        Google Calendar."
      />

      <CollapsibleDefinition
        term="Is my data safe?"
        description="We take your privacy seriously. Audiocalendar only accesses the
        necessary information to create calendar events. Your data is secure and
        never shared with third parties."
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
  </section>
);

export default FAQ;
