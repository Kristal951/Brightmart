export default function FeatureCard({ icon, description }) {
    return (
      <article className="flex flex-col w-[300px] max-md:mt-10">
        <div className="flex flex-col justify-center px-2 py-2 max-w-[70px] bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[100px]">
          <img
            loading="lazy"
            src={icon}
            alt="Feature illustration"
            className="object-contain w-full "
          />
        </div>
        <p className="mt-3.5 text-xl text-[#DBEBFC]">
          {description}
        </p>
      </article>
    );
  }