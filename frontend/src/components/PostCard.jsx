export default function PostCard({ post }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600">{post.excerpt}</p>
      </div>
    );
  }
  