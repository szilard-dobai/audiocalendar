import dna from "../../../../public/dna.svg";
import folder from "../../../../public/folder.svg";
import history from "../../../../public/history.svg";
import Benefit from "./Benefit";

const Benefits = () => {
  return (
    <section
      id="benefits"
      className="my-36 text-center bg-complement-50 px-4 py-16 rounded-lg"
    >
      <hgroup className="mb-14">
        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-2">
          Benefits
        </h2>
        <p className="text-md md:text-xl text-secondary">
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
  );
};

export default Benefits;
