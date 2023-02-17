import Link from "next/link";

export default function Success({ order, id }: { order: any; id: any }) {
  return (
    <div>
      Success!
      <br />
      <Link href="/">
        <b>
          <button>Go back to home</button>
        </b>
      </Link>
    </div>
  );
}
