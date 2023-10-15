import Card from "@/components/Card";
import dna from "@public/dna.svg";
import folder from "@public/folder.svg";
import history from "@public/history.svg";
import Benefit from "./Benefit";

const Benefits = () => (
  <Card
    id="benefits"
    title="Benefits"
    description="See How Audiocalendar Can Transform Your Music Experience"
    content={
      <div className="flex flex-col md:flex-row md:items-stretch md:justify-evenly gap-16">
        <Benefit
          imageAlt="history illustration"
          imageSrc={history}
          title="Never Forget a Beat"
          description={
            <>
              Audiocalendar ensures you never have to ask yourself again{" "}
              <span className="italic">
                &quot;What was that song I listened to last night called?&quot;
              </span>{" "}
              It automatically logs every song you play, so you can revisit your
              musical moments anytime.
            </>
          }
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
    }
  />
);

export default Benefits;
