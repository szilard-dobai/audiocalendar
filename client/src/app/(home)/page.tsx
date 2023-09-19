import Image from "next/image";

import svg from "../../../public/undraw_walk_in_the_city.svg";
import Button from "@/components/Button";
const Home = () => {
  return (
    <>
      <main className="flex min-h-screen max-w-screen-xl mx-auto flex-col items-center justify-between p-24">
        <section
          id="hero"
          className="flex flex-col gap-12 md:gap-0 md:grid md:grid-cols-10 py-12 items-center"
        >
          <div className="md:col-start-1 md:col-end-7 md:row-start-1 md:z-10">
            <hgroup className="mb-10">
              <h1 className="text-5xl font-bold text-gray-900">
                Never Lose a Song Again with{" "}
                <span className="text-brand">Audiocalendar</span>
              </h1>
              <p className="text-2xl text-gray-700">
                Your Personal Soundtrack, Organized Automatically
              </p>
            </hgroup>

            <Button variant="solid">Get Started</Button>
            <Button variant="outline" className="ml-5">
              Learn More
            </Button>
          </div>

          <div className="md:col-start-6 md:col-end-11 md:row-start-1 md:z-0">
            <Image
              src={svg}
              alt="people"
              className="aspect-auto lg:max-w-md lg:w-full max-w-xs"
            />
          </div>
        </section>

        <section id="benefits" className="py-12">
          <dl className="flex flex-col lg:flex-row lg:items-stretch lg:justify-evenly gap-16">
            <div className="flex-1 bg-brand-50 p-2 rounded-lg border border-brand-700 text-brand-700 hover:bg-brand-100 cursor-headphone">
              <dt className="text-xl font-semibold mb-4">Never Miss a Beat</dt>
              <dd className="text-brand-800">
                Keep track of every song you listen to on Spotify
              </dd>
              <dd className="text-brand-800">
                Automatically create a Google Calendar event for each song
              </dd>
              <dd className="text-brand-800">
                Say goodbye to forgotten music gems
              </dd>
            </div>

            <div className="flex-1 bg-complement-50 p-2 rounded-lg border border-complement-700 text-complement-700 hover:bg-complement-100 cursor-headphone">
              <dt className="text-xl font-semibold mb-4">
                Effortless Organization
              </dt>
              <dd className="text-complement-800">
                No more manual data entry or playlists
              </dd>
              <dd className="text-complement-800">
                Audiocalendar seamlessly integrates with Spotify and Google
                Calendar
              </dd>
              <dd className="text-complement-800">
                Enjoy your music, we&apos;ll handle the rest
              </dd>
            </div>

            <div className="flex-1 bg-brand-50 p-2 rounded-lg border border-brand-700 text-brand-700 hover:bg-brand-100 cursor-headphone">
              <dt className="text-xl font-semibold mb-4">
                Rediscover Your Favorites
              </dt>
              <dd className="text-brand-800">
                Easily search and filter your music history
              </dd>
              <dd className="text-brand-800">
                Relive the moments tied to your favorite songs
              </dd>
              <dd className="text-brand-800">
                Share your musical journey with friends
              </dd>
            </div>
          </dl>
        </section>

        <section id="faq">
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

        <section id="cta">
          <h2>Start Organizing Your Music Journey Today</h2>
          <button>Sign Up Now</button>
        </section>

        <footer>Follow Us on [Social Media Icons]</footer>
      </main>
    </>
  );
};

export default Home;
