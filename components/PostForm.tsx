import Image from "next/image";

function PostForm(props: { post: any }) {
  return (
    <div className="my-8max-w-sm rounded overflow-hidden shadow-lg hover:-translate-y-1 duration-300">
      <img
        src={
          props.post.image != null
            ? props.post.image
            : "https://via.placeholder.com/400"
        }
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.post.name}</div>
        <p className="text-gray-700 text-base">{props.post.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Price: {props.post.price}
        </span>
      </div>
    </div>
  );
}

export default PostForm;
