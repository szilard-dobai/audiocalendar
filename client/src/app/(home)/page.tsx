import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import Link from "next/link";
import dna from "../../../public/dna.svg";
import folder from "../../../public/folder.svg";
import history from "../../../public/history.svg";
import banner from "../../../public/undraw_walk_in_the_city.svg";
import Benefit from "./(components)/Benefit";

const Home = () => {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto">
      <Navigation />

      <main className="flex flex-col items-center justify-between px-16">
        <section
          id="hero"
          className="flex flex-col gap-12 md:gap-0 md:grid md:grid-cols-10 my-36 items-center"
        >
          <div className="md:col-start-1 md:col-end-7 md:row-start-1 md:z-10">
            <hgroup className="mb-10">
              <h1 className="text-5xl font-bold text-primary mb-2">
                Never Lose a Song Again with{" "}
                <span className="text-brand">Audiocalendar</span>
              </h1>
              <p className="text-2xl text-secondary">
                Your Personal Soundtrack, Organized Automatically
              </p>
            </hgroup>

            <Button variant="solid">Get Started</Button>
            <Link href="#cta" passHref legacyBehavior>
              <Button variant="outline" className="ml-5">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="md:col-start-6 md:col-end-11 md:row-start-1 md:z-0">
            <Image
              src={banner}
              alt="person walking in the city with headphones on"
              className="aspect-auto lg:max-w-md lg:w-full max-w-xs"
            />
          </div>
        </section>

        <section id="benefits" className="my-36 text-center">
          <hgroup className="mb-14">
            <h2 className="text-5xl font-bold text-primary mb-2">Benefits</h2>
            <p className="text-xl text-secondary">
              See How Audiocalendar Can Transform Your Music Experience
            </p>
          </hgroup>

          <div className="flex flex-col md:flex-row md:items-stretch md:justify-evenly gap-16">
            <Benefit
              imageAlt="history illustration"
              imageSrc={history}
              title="Never Forget a Beat"
              description='Audiocalendar ensures you never have to ask yourself again "What was that song I listened to last night called?" It automatically logs every song you play, so you can revisit your musical moments anytime.'
            />

            <Benefit
              imageAlt="dna illustration"
              imageSrc={dna}
              title="Discover Your Music DNA"
              description="By tracking your listening habits, Audiocalendar provides valuable insights into your favorite genres, artists, and most-played songs. Uncover your unique music profile and enhance your listening experience."
            />

            <Benefit
              imageAlt="folder illustration"
              imageSrc={folder}
              title="Streamlined Song Tracking"
              description="Audiocalendar simplifies the process of keeping tabs on your music journey. Effortlessly manage and organize your song history to make every listening session unforgettable."
            />
          </div>
        </section>

        <section id="faq" className="my-36">
          <dl>
            <dt>How does Audiocalendar work?</dt>
            <dd>
              Audiocalendar connects to your Spotify and Google accounts.
              Whenever you listen to a song on Spotify, it automatically creates
              an event in your Google Calendar.
            </dd>

            <dt>Is my data safe?</dt>
            <dd>
              We take your privacy seriously. Audiocalendar only accesses the
              necessary information to create calendar events. Your data is
              secure and never shared with third parties.
            </dd>

            <dt>Can I customize my calendar events?</dt>
            <dd>
              Absolutely! You have full control over event titles, descriptions,
              and calendar settings. Make it personal and meaningful.
            </dd>

            <dt>Is Audiocalendar free to use?</dt>
            <dd>
              Yes, we offer a free plan with essential features. For advanced
              functionality and additional customization options, we offer a
              premium subscription.
            </dd>

            <dt>Can I unlink my accounts?</dt>
            <dd>
              Yes, you can unlink your Spotify and Google accounts at any time
              within the Audiocalendar settings.
            </dd>
          </dl>
        </section>

        <section id="cta" className="my-36">
          <h2>Start Organizing Your Music Journey Today</h2>
          <button>Sign Up Now</button>
        </section>

        <footer className="my-36">Follow Us on [Social Media Icons]</footer>
      </main>
    </div>
  );
};

export default Home;
