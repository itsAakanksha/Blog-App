import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    services.deletePosts(post.$id).then((status) => {
      if (status) {
        services.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-16 bg-gray-100">
      <Container>
        <div className="w-full flex flex-col items-center mb-8">
          <img
            src={services.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl object-cover w-full h-80 md:h-96 lg:h-128 shadow-xl"
          />

          {isAuthor && (
            <div className="mt-6 flex space-x-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
        </div>
        <div className="prose max-w-full text-gray-700">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
