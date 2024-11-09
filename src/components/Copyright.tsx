import Link from "next/link";

const Copyright = () => {
  return (
    <p className="text-center mt-8">
      {"Copyright © "}
      <Link className="text-blue-500" href="/">
        ApparteKost
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </p>
  );
};

export default Copyright;
